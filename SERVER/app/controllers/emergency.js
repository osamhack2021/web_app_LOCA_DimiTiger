const Boom = require('@hapi/boom');
const Joi = require('joi');
const EmergencyService = require('../services/emergency');
const { removeUndefined } = require('../utils/object-editor');

exports.getEmergencies = {
	tags: ['api', 'emergency'],
	description: '긴급 신고 목록을 가져옵니다.',
	validate: {
		query: Joi.object({
			page: Joi.number().description('페이지'),
			limit: Joi.number().description('가져올 개수'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await EmergencyService.getEmergencies(removeUndefined(req.query));
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};
exports.getEmergency = {
	tags: ['api', 'emergency'],
	description: '긴급 신고를 가져옵니다.',
	validate: {
		params: Joi.object({
			emergencyId: Joi.string().description('긴급 신고 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await EmergencyService.getEmergency(req.params.emergencyId);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.createEmergency = {
	tags: ['api', 'emergency'],
	description: '긴급 신고를 새로 만듭니다.',
	validate: {},
	handler: async (req, h) => {
		try {
			return await EmergencyService.createEmergency({
				creator: req.auth.credentials._id,
			});
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.deleteEmergency = {
	tags: ['api', 'emergency'],
	description: '긴급 신고를 삭제합니다.',
	validate: {
		params: Joi.object({
			emergencyId: Joi.string().description('긴급 신고 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await EmergencyService.deleteEmergency(req.params.emergencyId);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.deactivateEmergency = {
	tags: ['api', 'emergency'],
	description: '긴급 신고를 비활성화합니다.',
	validate: {
		params: Joi.object({
			emergencyId: Joi.string().description('긴급 신고 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await EmergencyService.deactivateEmergency(req.params.emergencyId);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.addEmergencyAdditionalReport = {
	tags: ['api', 'emergency'],
	description: '긴급 신고 추가보고를 합니다.',
	validate: {
		params: Joi.object({
			emergencyId: Joi.string().description('긴급 신고 _id'),
		}),
		payload: Joi.object({
			content: Joi.string().required(),
		}),
	},
	handler: async (req, h) => {
		try {
			return await EmergencyService.addEmergencyAdditionalReport(
				req.params.emergencyId,
				{
					content: req.payload.content,
				}
			);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.updateEmergency = {
	tags: ['api', 'emergency'],
	description: '긴급 신고 정보를 수정합니다..',
	validate: {
		params: Joi.object({
			emergencyId: Joi.string().description('긴급 신고 _id'),
		}),
		payload: Joi.object({
			active: Joi.boolean(),
		}),
	},
	handler: async (req, h) => {
		try {
			return await EmergencyService.updateEmergency(
				req.params.emergencyId,
				req.payload
			);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};
