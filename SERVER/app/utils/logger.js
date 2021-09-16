const pino = require('pino');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = pino({
	enabled: process.env.LOG_DISABLED !== 'true',
	prettyPrint: isDev && {
		translateTime: 'SYS:standard',
		ignore: 'pid,hostname',
	},
	level: isDev ? 'trace' : 'info',
	redact: [
		'req.headers.authorization',
		'payload.password',
		'payload.client_secret',
	],
});
