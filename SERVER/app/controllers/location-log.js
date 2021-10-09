const Boom = require('@hapi/boom');
const Joi = require('joi');
const LocationLogService = require('../services/location-log');
const { removeUndefined } = require('../utils/object-editor');

exports.getLocationLogs = {
	tags: ['api', 'location'],
	description: '위치 로그를 가져옵니다.',
	validate: {
		query: Joi.object({
			active: Joi.boolean().description('최신 데이터만 가져옵니다'),
			user: Joi.string().description('해당 사용자의 데이터를 가져옵니다.'),
			location: Joi.string().description('해당 장소의 데이터를 가져옵니다.'),
			rangeStart: Joi.date().description('기록 시간 범위 시작'),
			rangeEnd: Joi.date().description('기록 시간 범위 종료'),
			page: Joi.number().description('페이지'),
			limit: Joi.number().description('가져올 개수'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await LocationLogService.getLocationLogs(
				removeUndefined(req.query)
			);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};

exports.createLocationLog = {
	tags: ['api', 'location'],
	description: '위치를 새로 만듭니다.',
	validate: {
		payload: Joi.object({
			user: Joi.string().required(),
			location: Joi.string().required(),
		}),
	},
	handler: async (req, h) => {
		try {
			return await LocationLogService.createLocationLog(req.payload);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};
