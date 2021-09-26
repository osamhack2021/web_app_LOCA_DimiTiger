exports.plugin = {
	name: 'routes_notices',
	register: async (server, options) => {
		const Controllers = {
			notice: require('../controllers/notice'),
		};
		server.route([
			{
				method: 'GET',
				path: '/',
				config: Controllers.notice.getNotices,
			},
			{
				method: 'GET',
				path: '/{noticeId}',
				config: Controllers.notice.getNotice,
			},
			{
				method: 'POST',
				path: '/',
				config: Controllers.notice.createNotice,
			},
			{
				method: 'DELETE',
				path: '/',
				config: Controllers.notice.deleteNotice,
			},
		]);
	},
};
