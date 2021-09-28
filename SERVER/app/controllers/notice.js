const Boom = require('@hapi/boom');
const Joi = require('joi');
const NoticeService = require('../services/notice');

exports.getNotices = {
	tags: ['api', 'notice'],
	description: '공지 목록을 가져옵니다.',
	validate: {},
	handler: async (req, h) => {
		try {
			return await NoticeService.getNotices();
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};
exports.getNotice = {
	tags: ['api', 'notice'],
	description: '공지를 가져옵니다.',
	validate: {
		params: Joi.object({
			noticeId: Joi.string().description('공지 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await NoticeService.getNotice(req.params.noticeId);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};

exports.createNotice = {
	tags: ['api', 'notice'],
	description: '공지를 새로 만듭니다.',
	validate: {
		payload: Joi.object({
			content: Joi.string().required(),
			emergency: Joi.boolean().required().default(false),
		}),
	},
	handler: async (req, h) => {
		try {
			return await NoticeService.createNotice({
				creator: req.auth.credentials._id,
				content: req.payload.content,
				emergency: req.payload.emergency,
			});
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};

exports.deleteNotice = {
	tags: ['api', 'notice'],
	description: '공지를 삭제합니다.',
	validate: {
		params: Joi.object({
			noticeId: Joi.string().description('공지 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await NoticeService.removeNotice(req.params.noticeId);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};
