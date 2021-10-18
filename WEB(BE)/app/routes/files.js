exports.plugin = {
	name: 'routes_files',
	register: async (server, options) => {
		const Controllers = {
			file: require('../controllers/file'),
		};
		server.route([
			{
				method: 'POST',
				path: '/upload',
				config: Controllers.file.upload,
			},
		]);
	},
};
