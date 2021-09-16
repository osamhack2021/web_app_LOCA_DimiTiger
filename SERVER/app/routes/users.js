exports.plugin = {
	name: 'routes_users',
	register: async (server, options) => {
		const Controllers = {
			user: require('../controllers/user'),
		};
		server.route([
			{
				method: 'GET',
				path: '/',
				config: Controllers.user.getUsers,
			},
		]);
	},
};
