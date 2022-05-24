
class Event(object):
    """
    Event is the base class acting as an interface for all (inherited)
    events in the trading system infrastructure.
    """
    
    pass

class OrderEvent(Event):
    """
    Handles the event of sending an Order (sent from the Portfolio) to an execution system.
    The order contains a ticker (e.g. EVO), a type (market or limit),
    quantity and a direction.
    """

    def __init__(self, datetime, sid, ticker, order_type, quantity, order_price, stop_loss, direction, indicator):
        """_summary_

        Args:
            ticker (string): The instrument to trade, e.g. EVO.
            sid (int): Stock id used to differentieate between instruments with same ticker.
            order_type (string): 'MKT' or 'LMT' for Market or Limit order.
            quantity (int): Non-negative integer for order quantity.
            direction (string): 'BUY' or 'SELL' for long or short.
        """
        
        self.type = 'ORDER'
        self.datetime = datetime
        self.sid = sid
        self.ticker = ticker
        self.order_type = order_type
        self.quantity = quantity
        self.order_price = order_price
        self.stop_loss = stop_loss
        self.direction = direction
        self.indicator = indicator

    def print_order(self):
        """
        Outputs the values within the Order.
        """
        print("Order: sid=%s, ticker=%s, Type=%s, Quantity=%s, Price=%s, Direction=%s Indicator=%s" % \
            (self.sid, self.ticker, self.order_type, self.quantity, self.order_price, self.direction, self.indicator))
        
        
class FillEvent(Event):
    """
    Encapsulates the notion of a Filled Order, as returned
    from a brokerage. Stores the quantity of an instrument
    actually filled and at what price. In addition, stores
    the commission of the trade from the brokerage.
    """

    def __init__(self, datetime, sid, ticker, exchange, quantity, price, stop_loss,
                 direction, order_type, fill_cost, currency, indicator, commission=None):
        """
        Initialises the FillEvent object. Sets the ticker, exchange,
        quantity, direction, cost of fill and an optional 
        commission.

        Args:
            datetime (DateTime): the point in time the order was filled.
            ticker (string): The instrument which as filled.
            sid (int): The unique instrument id.
            exchange (string): The exchange where the order was filled.
            quantity (int): The filled quantity.
            price (float): The price the order was filled at.
            direction (string): The direction of the fill ('BUY' or 'SELL').
            fill_cost (float): The holdings value in SEK.
            commission (float, optional): An  optional comission cost.
        """
        
        self.type = 'FILL'
        self.datetime = datetime
        self.ticker = ticker
        self.sid = sid
        self.exchange = exchange
        self.quantity = quantity
        self.price = price
        self.stop_loss = stop_loss
        self.direction = direction
        self.order_type = order_type
        self.fill_cost = fill_cost
        self.currency = currency
        
        self.indicator = indicator

         # Calculate commission
        if commission is None:
            self.commission = 0
        else:
            self.commission = commission