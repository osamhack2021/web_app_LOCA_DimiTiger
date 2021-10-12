const Boom = require('@hapi/boom');
const Notice = require('../models/notice');

const Errors = (exports.Errors = {
	NoticeNotFoundError: () => Boom.notFound('NoticeNotFoundError'),
});

exports.getNotices = async ({ page, limit }) => {
	return await Notice.paginate(
		{
			deleted: false,
		},
		{
			page: page || 1,
			limit: limit || 10,
			pagination: limit != 0,
			sort: {
				createdAt: -1,
			},
		}
	);
};

exports.getNotice = async (_id) => {
	const notice = await Notice.findById(_id).exec();
	if (!notice) throw Errors.NoticeNotFoundError();
	return notice;
};

exports.createNotice = async ({ content, emergency, creator }) => {
	return await new Notice({ content, emergency, creator }).save();
};

exports.updateNotice = async (_id, fields) => {
	const notice = await Notice.findById(_id).exec();

	if (!notice) throw Errors.NoticeNotFoundError();

	for (const key in fields) {
		notice[key] = fields[key];
	}

	await notice.save();

	return notice;
};

exports.deleteNotice = async (_id) => {
	return await exports.updateNotice(_id, { deleted: true });
};
