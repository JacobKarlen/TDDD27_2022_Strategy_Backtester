import pandas as pd
import queue

class Portfolio:
    """
    Class representing a portfolio and tracks all statistics such as executions, transactions,
    position and portfolio snapshots (A daily snapshot of each position and aggregated statistics
    on a portfolio level). These 4 categories of data contain all information needed to derive
    pretty much any performance statistic of the portfolio.
    """
    
    def __init__(self):  
        self.cash = 100000.0
        
        self.pending_orders = queue.Queue()
        
        # dataframes for tracking transactions and portfolio over time
        self.transactions = pd.DataFrame(
            columns=[
                'sid',
                'ticker',
                'direction',
                'entry_date', 
                'avg_entry_price', # initiation
                'exit_date',
                'avg_exit_price',  # liquidation
                'holding_period',
                'stop_loss',
                'open_quantity' # 0 == closed position
            ]
        )
        self.transactions.index.names = ['transaction_id']
            
        self.executions = pd.DataFrame()
            
        self.portfolio_snapshots = pd.DataFrame(
            columns=[
                'cash',
                'market_value',
                'equity',
                'leverage',
                'unrealized_pnl'
            ]
        )
        self.portfolio_snapshots.index.names = ['date']
            
        self.position_snapshots = pd.DataFrame() 
        
        
    def add_transaction(self, event):
        """
        Takes in a Fill Event and adds a transaction record to the portfolio.

        Args:
            event (FillEvent): A Fill Event representing an executed order.

        Returns:
            int: returns the transaction id of the newly added transaction.
        """

        direction = 'LONG' if event.direction == 'BUY' else 'SHORT'
        
        stop_loss = event.stop_loss # need to figure out where stop loss comes in
        # commission should also be calculated automatically based on scheme
        
        tr = (event.sid, event.ticker, direction, event.datetime, event.price, None, None, 0, stop_loss, event.quantity)
        
        transaction_id = 1 if self.transactions.empty else self.transactions.index[-1] + 1
        
        self.transactions.loc[transaction_id] = tr
    
        return transaction_id
    
    def update_transaction(self, transaction_id, date):
        """
        Updates an existing transaction with any new executions
        in the same instrument that should be grouped under the same transaction.

        Args:
            transaction_id (int): The transaction id for the transaction to update.
            date (date): The date when the update takes place.
        """
        avg_entry_price = 0
        avg_exit_price = 0
        buy_quantity = 0
        sell_quantity = 0
        
        for date, ex in self.executions.loc[pd.IndexSlice[:, transaction_id], :].groupby(level=0):
            if ex.iloc[0]['buy_sell'] == 'BUY':
                buy_quantity += ex.iloc[0]['quantity']
                avg_entry_price += ex.iloc[0]['quantity'] * ex.iloc[0]['price']
            else:
                sell_quantity += ex.iloc[0]['quantity']
                avg_exit_price += ex.iloc[0]['quantity'] * ex.iloc[0]['price']
            
        open_quantity = buy_quantity - sell_quantity
        
        avg_entry_price = None if buy_quantity == 0 else avg_entry_price / buy_quantity
        avg_exit_price = None if sell_quantity == 0 else avg_exit_price / sell_quantity
        exit_date = date if open_quantity == 0 else None
        
        trs = self.transactions
        sid, ticker, direction, entry_date, stop_loss = trs.loc[transaction_id, ['sid', 'ticker', 'direction', 'entry_date', 'stop_loss']] 
        holding_period = (date-entry_date).days

        trs.loc[transaction_id] = (sid, ticker, direction, entry_date, avg_entry_price, exit_date, avg_exit_price, holding_period, stop_loss, open_quantity)    
                
        
    def add_execution(self, ex):
        """
        Adds an execution record to the portfolio based on a Fill Event.

        Args:
            ex (FillEvent): A Fill Event representing an executed order.
        """
        
        trs = self.transactions
        if not trs.empty:
            open = trs[(trs.sid == ex.sid) & (trs.open_quantity !=0)]
        else:
            open = pd.DataFrame()
        transaction_id = self.add_transaction(ex) if open.empty else open.index[0]

        # if executions dataframe empty, set it up, otherwise add new execution to dataframe
        if self.executions.empty:
            self.executions = pd.DataFrame(
                [(ex.datetime, transaction_id, ex.sid, ex.ticker, ex.indicator, ex.direction, ex.order_type, ex.commission, ex.quantity, ex.price, ex.currency )],
                columns = [ 'date', 'transaction_id', 'sid','ticker', 'indicator', 'buy_sell', 'order_type', 'commission', 'quantity', 'price', 'currency' ]
            )
            self.executions.set_index(['date', 'transaction_id'], inplace=True)
        else:
            self.executions.loc[pd.IndexSlice[ex.datetime, transaction_id],:] = (ex.sid, ex.ticker, ex.indicator, ex.direction, ex.order_type, ex.commission, ex.quantity, ex.price, ex.currency)
            self.update_transaction(transaction_id, ex.datetime)
            
    def update_fill(self, event):
        """
        Updates the cash balance based on the Fill Event (execution) and
        adds a record of the executon to the portfolio.

        Args:
            event (_type_): _description_
        """
        if event.type == 'FILL':
            self.add_execution(event)
            factor = -1 if event.direction == 'BUY' else 1
            
            self.cash = self.cash + factor * event.fill_cost - event.commission
            
    def get_open_positions(self):
        """
        Get all currently open positions in the portfolio as a pandas DataFrame.

        Returns:
            pd.DataFrame: A pandas DataFrame of all open positions.
        """
        trs = self.transactions
        if not trs.empty:
            open = trs.loc[(trs.open_quantity !=0)]
            return open
        else: 
            return pd.DataFrame()
        
    def get_portfolio_equity(self):
        pf_ss = self.portfolio_snapshots
        if not pf_ss.empty:
            open = pf_ss.iloc[-1]['equity']
            return open
        else: 
            return self.cash
    
          
    def get_current_position_size(self, sid, date):
        """
        Get the current position size of stock with instrument id sid
        on the specified date as percent of portfolio equity.

        Args:
            sid (int): Borsdata instrument id for the stock.
            date (date): The date you want the size for.

        Returns:
            float: The position size in percent of portfolio equity.
        """
        ps_ss = self.position_snapshots
        date = date
    
        if not ps_ss.empty and ps_ss.index.isin([(date, sid)]).any():          
            return ps_ss.loc[pd.IndexSlice[date, sid], 'market_value'] / self.get_portfolio_equity()
        else:
            return 0
        
    def get_available_cash(self):
        """
        Get currently available cash in the portfolio when taking in to account
        pending buy and sell orders.

        Returns:
            float: The currently available cash factoring in pending orders.
        """

        cash = self.cash

        order_backlog = queue.Queue()
        while True:
            try:
                order = self.pending_orders.get(False)
            except queue.Empty:
                break
            else:
                order_backlog.put(order)
                
                if order.direction == 'BUY':
                    cash = cash - order.quantity * order.order_price
                if order.direction == 'SELL':
                    cash = cash + order.quantity * order.order_price
               
        self.pending_orders = order_backlog          
        return cash
    
        
    def get_available_quantity(self, sid):
        """
        Get the currently available quantity of stock with instrument id sid in
        the portfolio after taking into account buy and sell orders of the stock.

        Args:
            sid (int): Borsdata instrument id for the stock to get quantity of.

        Returns:
            int: The available quantity (number of shares) of the stock currently in the portfolio.
        """
        open_quantity = 0
        open_pos = self.get_open_positions()
        if not open_pos.empty and not open_pos.loc[open_pos.sid == sid].empty:
            open_quantity = open_pos.loc[open_pos.sid == sid, 'open_quantity'].iloc[0]
            
            order_backlog = queue.Queue()
            while True:
                try:
                    order = self.pending_orders.get(False)
                except queue.Empty:
                    break
                else:
                    order_backlog.put(order)
                    if order.sid == sid:
                        if order.direction == 'BUY':
                            open_quantity += order.quantity
                        if order.direction == 'SELL':
                            open_quantity -= order.quantity
        self.pending_orders = order_backlog

        return open_quantity
            
    def take_snapshot(self, date, df):   
        """
        Takes a snapshot of open positions for each date and a snapshot of the portfolio as a whole.
        These snapshots can then be used later to derive performance metrics and statistics on both
        a trade and portfolio level.

        Args:
            date (date): The date of the snapshot.
            df (pd.DataFrame): A pandas DataFrame of price data for the stocks trading during the
            date of the snapshot.
        """
        
        open_transactions = self.get_open_positions()
        
        if not open_transactions.empty:
           
            for sid, tr_df in open_transactions.groupby('sid'):
                
                ticker, quantity, entry_price, entry_date, stop_loss = tr_df.iloc[0][['ticker', 'open_quantity', 'avg_entry_price', 'entry_date', 'stop_loss']]              
                
                
                sids = getattr(df.ins_id, 'values', [df.ins_id]) 
                
                if sid not in sids:
                    if self.position_snapshots.empty or date == entry_date:
                        current_price = entry_price
                        
                    else:
                        last_traded = self.position_snapshots.loc[pd.IndexSlice[:, sid], :].index[-1][0]
                        current_price = self.position_snapshots.loc[pd.IndexSlice[last_traded, sid], 'current_price']
                else:
                    if isinstance(df, pd.DataFrame):
                        current_price = df[df.ins_id == sid].iloc[0]['close']
                    else:
                        if (df.ins_id == sid):
                            current_price = df.close
                
                market_value = quantity * current_price
                unrealized_pnl = market_value - quantity * entry_price
                
                # add the data to the position snapshots dataframe (create if doesn't exist)
                if self.position_snapshots.empty:
                    self.position_snapshots = pd.DataFrame(
                        [(date, sid, ticker, quantity, entry_price, current_price, stop_loss, market_value, unrealized_pnl)],
                        columns=[ 'date', 'sid', 'ticker', 'quantity', 'entry_price', 'current_price', 'stop_loss', 'market_value', 'unrealized_pnl' ]
                    )
                    self.position_snapshots.set_index(['date', 'sid'], inplace=True)
                else:
                    self.position_snapshots.loc[pd.IndexSlice[date, sid],:] = (ticker, quantity, entry_price, current_price, stop_loss, market_value, unrealized_pnl)
            
        # calculate values for aggregated portfolio snapshot and add to dataframe
        if self.position_snapshots.empty:
            market_value = 0
            unrealized_pnl = 0
        else:
            market_value = 0 if not date in self.position_snapshots.index.get_level_values(0) else self.position_snapshots.loc[pd.IndexSlice[date, :], 'market_value'].sum()
            unrealized_pnl = 0 if not date in self.position_snapshots.index.get_level_values(0) else self.position_snapshots.loc[pd.IndexSlice[date, :], 'unrealized_pnl'].sum()
        
        equity = market_value + self.cash
        leverage = market_value / equity
        self.portfolio_snapshots.loc[date] = (self.cash, market_value, equity, leverage, unrealized_pnl)