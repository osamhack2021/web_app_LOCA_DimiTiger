const routes = [require('./users')];

exports.plugin = {
	name: 'routes',
	register: async (server, options) => {
		server.route([
			{
				method: 'GET',
				path: '/',
				config: {
					auth: false,
					handler(request, h) {
						return h.view('index');
					},
				},
			},
		]);

		routes.forEach((route) =>
			server.register(route, {
				routes: {
					prefix: `/${route.plugin.name.split('_')[1]}`,
				},
			})
		);
	},
};
