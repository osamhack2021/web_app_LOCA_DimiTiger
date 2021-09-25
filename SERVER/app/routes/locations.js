exports.plugin = {
	name: 'routes_locations',
	register: async (server, options) => {
		const Controllers = {
			location: require('../controllers/location'),
		};
		server.route([
			{
				method: 'GET',
				path: '/',
				config: Controllers.location.getLocations,
			},
			{
				method: 'GET',
				path: '/{locationId}',
				config: Controllers.location.getLocation,
			},
			{
				method: 'POST',
				path: '/',
				config: Controllers.location.createLocation,
			},
			{
				method: 'PATCH',
				path: '/{locationId}',
				config: Controllers.location.updateLocation,
			},
		]);
	},
};
