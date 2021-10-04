const Boom = require('@hapi/boom');
const Joi = require('joi');
const LocationService = require('../services/location');

exports.getLocations = {
	tags: ['api', 'location'],
	description: '위치 목록을 가져옵니다.',
	validate: {},
	handler: async (req, h) => {
		try {
			return await LocationService.getLocations();
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};
exports.getLocation = {
	tags: ['api', 'location'],
	description: '위치를 가져옵니다.',
	validate: {
		params: Joi.object({
			locationId: Joi.string().description('위치 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await LocationService.getLocation(req.params.locationId);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};

exports.createLocation = {
	tags: ['api', 'location'],
	description: '위치를 새로 만듭니다.',
	validate: {
		payload: Joi.object({
			name: Joi.string().required(),
			ui: Joi.object(),
		}),
	},
	handler: async (req, h) => {
		try {
			return await LocationService.createLocation(req.payload);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};

exports.updateLocation = {
	tags: ['api', 'location'],
	description: '위치 정보를 수정합니다..',
	validate: {
		params: Joi.object({
			locationId: Joi.string().description('위치 _id'),
		}),
		payload: Joi.object({
			name: Joi.string().required(),
			ui: Joi.object(),
		}),
	},
	handler: async (req, h) => {
		try {
			return await LocationService.updateLocation(
				req.params.locationId,
				req.payload
			);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};
