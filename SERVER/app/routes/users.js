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
			{
				method: 'POST',
				path: '/',
				config: Controllers.user.createUsers,
			},
			{
				method: 'POST',
				path: '/register',
				config: Controllers.user.registerUsers,
			},
			{
				method: 'GET',
				path: '/me',
				config: Controllers.user.me,
			},
			{
				method: 'GET',
				path: '/{userId}',
				config: Controllers.user.getUser,
			},
			{
				method: 'PATCH',
				path: '/{userId}',
				config: Controllers.user.updateUsers,
			},
		]);
	},
};
