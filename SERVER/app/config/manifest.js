const Boom = require('@hapi/boom');

const pkg = require('../../package.json');
const logger = require('../utils/logger');

module.exports = {
	server: {
		host: '0.0.0.0',
		port: process.env.PORT || 3000,
		routes: {
			cors: true,
			validate: {
				failAction: async (request, h, err) => {
					throw Boom.badRequest(err.message);
				},
			},
		},
	},
	register: {
		plugins: [
			{
				plugin: 'hapi-cors',
			},
			{
				// Static file and directory handlers for hapi.js.
				plugin: '@hapi/inert',
			},
			{
				// Template rendering support for hapi.js.
				plugin: '@hapi/vision',
			},
			{
				plugin: 'hapi-socket.io',
				options: {
					auth: 'jwt',
					socketoptions: {
						//Adicionar las opciones necesarias, el plugin tiene las opciones por defecto de socket.io las cuales puede ver en https://socket.io/docs/server-api/#new-server-httpserver-options
					},
				},
			},
			{
				plugin: 'hapi-swagger',
				options: {
					info: {
						title: 'Loca OAuth2 Resource Server Documentation',
						version: pkg.version,
					},
					securityDefinitions: {
						jwt: {
							type: 'apiKey',
							name: 'Authorization',
							in: 'header',
						},
					},
					security: [
						{
							jwt: [],
						},
					],
					documentationRouteTags: ['swaggerui'],
				},
			},
			{
				plugin: 'hapi-pino',
				options: {
					instance: logger,
					logRouteTags: true,
					logPayload: true,
					ignoreTags: ['swaggerui', 'nolog'],
				},
			},
			{
				plugin: require('../plugins/mongoose'),
				options: {
					uri: process.env.MONGO_URI,
				},
			},
			{
				plugin: require('../plugins/jwt-auth'),
			},
			{
				plugin: require('../routes/index.js'),
			},
		],
	},
};
