exports.plugin = {
	name: 'routes_auth',
	register: async (server, options) => {
		const Controllers = {
			auth: require('../controllers/auth'),
		};
		server.route([
			{
				method: 'POST',
				path: '/token',
				config: Controllers.auth.token,
			},
			{
				method: 'POST',
				path: '/refresh',
				config: Controllers.auth.refresh,
			},
		]);
	},
};
