const routes = [
	require('./users'),
	require('./auth'),
	require('./beacons'),
	require('./locations'),
	require('./location-logs'),
	require('./settings'),
	require('./notices'),
	require('./emergencies'),
];

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
