export const config = {
    'port': process.env.WEB_PORT || 8080,
    'mongo': {
        'uri': process.env.MONGO_URI || 'mongodb://database/strategy-backtester:27017',
        'options': {

        }
    }
};