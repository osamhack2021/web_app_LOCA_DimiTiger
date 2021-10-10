const Boom = require('@hapi/boom');
const Joi = require('joi');
const SettingService = require('../services/setting');
const { removeUndefined } = require('../utils/object-editor');

exports.getSettings = {
	tags: ['api', 'setting'],
	description: '설정 목록을 가져옵니다.',
	validate: {
		query: Joi.object({
			page: Joi.number().description('페이지'),
			limit: Joi.number().description('가져올 개수'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await SettingService.getSettings(removeUndefined(req.query));
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};
exports.getSetting = {
	tags: ['api', 'setting'],
	description: '설정을 가져옵니다.',
	validate: {
		query: Joi.object({
			settingId: Joi.string().description('설정 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await SettingService.getSetting(req.query.settingId);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};
exports.getCurrentSetting = {
	tags: ['api', 'setting'],
	description: '최신 설정을 가져옵니다.',
	validate: {},
	handler: async (req, h) => {
		try {
			return await SettingService.getCurrentSetting();
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.createSetting = {
	tags: ['api', 'setting'],
	description: '설정을 새로 만듭니다.',
	validate: {
		payload: Joi.object(),
	},
	handler: async (req, h) => {
		try {
			return await SettingService.createSetting({
				creator: req.auth.credentials._id,
				data: req.payload,
			});
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};
