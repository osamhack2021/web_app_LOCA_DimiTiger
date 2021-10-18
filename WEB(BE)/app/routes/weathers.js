exports.plugin = {
	name: 'routes_weathers',
	register: async (server, options) => {
		const Controllers = {
			weather: require('../controllers/weather'),
		};
		server.route([
			{
				method: 'GET',
				path: '/',
				config: Controllers.weather.getWeathers,
			},
		]);
	},
};
