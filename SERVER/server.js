require('dotenv').config();

const GracefulExceptions = require('node-graceful');
GracefulExceptions.captureException = true;

const Glue = require('@hapi/glue');
const manifest = require('./app/config/manifest');

const composeOptions = {
	relativeTo: __dirname,
};

exports.startServer = async function () {
	const server = await Glue.compose(manifest, composeOptions);
	server.views({
		engines: {
			html: require('handlebars'),
		},
		relativeTo: __dirname,
		path: 'app/views',
	});
	await server.start();

	server.events.on(
		{
			name: 'request',
		},
		(request, event) => {
			if (event.error) {
				if (event.error.isBoom && event.error.output.statusCode >= 500) {
					request.logger.error({ msg: event.error.message, err: event.error });
				} else {
					request.logger.debug({ msg: event.error.message, err: event.error });
				}
			}
		}
	);

	GracefulExceptions.on('exit', async () => {
		await server.stop();
	});

	return server;
};
