exports.plugin = {
	name: 'routes_settings',
	register: async (server, options) => {
		const Controllers = {
			setting: require('../controllers/setting'),
		};
		server.route([
			{
				method: 'GET',
				path: '/',
				config: Controllers.setting.getSettings,
			},
			{
				method: 'GET',
				path: '/current',
				config: Controllers.setting.getCurrentSetting,
			},
			{
				method: 'GET',
				path: '/{settingId}',
				config: Controllers.setting.getSetting,
			},
			{
				method: 'POST',
				path: '/',
				config: Controllers.setting.createSetting,
			},
		]);
	},
};
