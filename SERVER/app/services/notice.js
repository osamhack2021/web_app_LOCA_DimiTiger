const Notice = require('../models/notice');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	NoticeNotFoundError: createError('NoticeNotFoundError'),
});

exports.getNotices = async () => {
	return await Notice.find({ deleted: false }).exec();
};

exports.getNotice = async (_id) => {
	const notice = await Notice.findById(_id).exec();
	if (!notice) throw new Errors.NoticeNotFoundError();
	return notice;
};

exports.createNotice = async ({ content, emergency, creator }) => {
	return await new Notice({ content, emergency, creator }).save();
};

exports.removeNotice = async (_id) => {
	return await exports.updateNotice(_id, { deleted: true });
};

exports.updateNotice = async (_id, fields) => {
	const notice = await Notice.findById(_id).exec();

	if (!notice) throw new Errors.NoticeNotFoundError();

	for (const key in fields) {
		notice[key] = fields[key];
	}

	await notice.save();

	return notice;
};
