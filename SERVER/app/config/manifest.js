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
				options: {
					methods: ['POST, GET, OPTIONS, PUT, DELETE'],
				}
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
				name: 'static',
				register: async (server, options) => {
					server.route({
						method: 'GET',
						path: '/static/{param*}',
						handler: {
							directory: {
								path: './app/static',
								redirectToSlash: true,
							},
						},
						config: {
							auth: false,
						},
					});
					server.route({
						method: 'GET',
						path: '/apple-app-site-association',
						handler(request, h) {
							return h.file('./app/static/apple-app-site-association.json');
						},
						config: {
							auth: false,
						},
					});
					server.route({
						method: 'GET',
						path: '/.well-known/apple-app-site-association',
						handler(request, h) {
							return h.file('./app/static/apple-app-site-association.json');
						},
						config: {
							auth: false,
						},
					});
					server.route({
						method: 'GET',
						path: '/.well-known/assetlinks.json',
						handler(request, h) {
							return h.file('./app/static/assetlinks.json');
						},
						config: {
							auth: false,
						},
					});
				},
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
