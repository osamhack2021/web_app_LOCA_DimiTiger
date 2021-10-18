const { startServer } = require('./server');
const GracefulExceptions = require('node-graceful');
const logger = require('./app/utils/logger');

startServer().catch((err) => {
	logger.error(err);
	GracefulExceptions.exit(1);
});

process.setMaxListeners(20);
