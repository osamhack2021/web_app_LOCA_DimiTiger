exports.plugin = {
	name: 'routes_beacons',
	register: async (server, options) => {
		const Controllers = {
			beacon: require('../controllers/beacon'),
		};
		server.route([
			{
				method: 'GET',
				path: '/',
				config: Controllers.beacon.getBeacons,
			},
			{
				method: 'GET',
				path: '/{beaconId}',
				config: Controllers.beacon.getBeacon,
			},
			{
				method: 'POST',
				path: '/',
				config: Controllers.beacon.createBeacon,
			},
			{
				method: 'PATCH',
				path: '/{beaconId}',
				config: Controllers.beacon.udpateBeacon,
			},
		]);
	},
};
