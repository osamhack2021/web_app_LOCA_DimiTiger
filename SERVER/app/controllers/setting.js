const Boom = require('@hapi/boom');
const Joi = require('joi');
const SettingService = require('../services/setting');

exports.getSettings = {
	tags: ['api', 'setting'],
	description: '설정 목록을 가져옵니다.',
	validate: {},
	handler: async (req, h) => {
		try {
			return await SettingService.getSettings();
		} catch (err) {
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
			throw Boom.internal(err);
		}
	},
};

exports.createSetting = {
	tags: ['api', 'setting'],
	description: '설정을 새로 만듭니다.',
	validate: {
		payload: Joi.any(),
	},
	handler: async (req, h) => {
		try {
			return await SettingService.createSetting({
				creator: req.auth.credentials._id,
				data: req.payload,
			});
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};
