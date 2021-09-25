exports.plugin = {
	name: 'routes_location-logs',
	register: async (server, options) => {
		const Controllers = {
			locationLog: require('../controllers/location-log'),
		};
		server.route([
			{
				method: 'GET',
				path: '/',
				config: Controllers.locationLog.getLocationLogs,
			},
			{
				method: 'POST',
				path: '/',
				config: Controllers.locationLog.createLocationLog,
			},
		]);
	},
};
