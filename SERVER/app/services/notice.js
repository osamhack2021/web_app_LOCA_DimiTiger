<<<<<<< HEAD
const Notice = require('../models/notice');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	NoticeNotFoundError: createError('NoticeNotFoundError'),
=======
const Boom = require('@hapi/boom');
const Notice = require('../models/notice');

const Errors = (exports.Errors = {
	NoticeNotFoundError: () => Boom.notFound('NoticeNotFoundError'),
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
	if (!notice) throw new Errors.NoticeNotFoundError();
=======
	if (!notice) throw Errors.NoticeNotFoundError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
	return notice;
};

exports.createNotice = async ({ content, emergency, creator }) => {
	return await new Notice({ content, emergency, creator }).save();
};

exports.updateNotice = async (_id, fields) => {
	const notice = await Notice.findById(_id).exec();

<<<<<<< HEAD
	if (!notice) throw new Errors.NoticeNotFoundError();
=======
	if (!notice) throw Errors.NoticeNotFoundError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

	for (const key in fields) {
		notice[key] = fields[key];
	}

	await notice.save();

	return notice;
};

exports.deleteNotice = async (_id) => {
	return await exports.updateNotice(_id, { deleted: true });
};
