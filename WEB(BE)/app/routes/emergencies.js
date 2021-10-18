exports.plugin = {
	name: 'routes_emergencies',
	register: async (server, options) => {
		const Controllers = {
			emergency: require('../controllers/emergency'),
		};
		server.route([
			{
				method: 'GET',
				path: '/',
				config: Controllers.emergency.getEmergencies,
			},
			{
				method: 'GET',
				path: '/{emergencyId}',
				config: Controllers.emergency.getEmergency,
			},
			{
				method: 'POST',
				path: '/',
				config: Controllers.emergency.createEmergency,
			},
			{
				method: 'PATCH',
				path: '/{emergencyId}/additional-report',
				config: Controllers.emergency.addEmergencyAdditionalReport,
			},
			{
				method: 'PATCH',
				path: '/{emergencyId}',
				config: Controllers.emergency.updateEmergency,
			},
			{
				method: 'DELETE',
				path: '/{emergencyId}',
				config: Controllers.emergency.deleteEmergency,
			},
		]);
	},
};
