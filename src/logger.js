const path = require('path');
const logger = require('simple-node-logger').createSimpleLogger(path.join(__dirname, './routes/logs.log'));

logger.setLevel('info');

module.exports = logger;
