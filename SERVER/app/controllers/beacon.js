const Boom = require('@hapi/boom');
const Joi = require('joi');
const BeaconService = require('../services/beacon');
const { removeUndefined } = require('../utils/object-editor');

exports.getBeacons = {
	tags: ['api', 'beacon'],
	description: '비콘 목록을 가져옵니다.',
	validate: {
		query: Joi.object({
			page: Joi.number().description('페이지'),
			limit: Joi.number().description('가져올 개수'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await BeaconService.getBeacons(removeUndefined(req.query));
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.getBeacon = {
	tags: ['api', 'beacon'],
	description: '비콘을 가져옵니다.',
	validate: {
		params: Joi.object({
			beaconId: Joi.string().description('비콘 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await BeaconService.getBeacon(req.params.beaconId);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.createBeacon = {
	tags: ['api', 'beacon'],
	description: '비콘을 새로 만듭니다.',
	validate: {
		payload: Joi.object({
			location: Joi.string().required(),
			region: Joi.object({
				uuid: Joi.string().required(),
				major: Joi.number().integer().min(0).max(65535),
				minor: Joi.number().integer().min(0).max(65535),
			}),
		}),
	},
	handler: async (req, h) => {
		try {
			return await BeaconService.createBeacon(req.payload);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.udpateBeacon = {
	tags: ['api', 'beacon'],
	description: '비콘 정보를 수정합니다.',
	validate: {
		params: Joi.object({
			beaconId: Joi.string().description('비콘 _id'),
		}),
		payload: Joi.object({
			location: Joi.string().required(),
			region: Joi.object({
				uuid: Joi.string().required(),
				major: Joi.number().integer().min(0).max(65535),
				minor: Joi.number().integer().min(0).max(65535),
			}),
		}),
	},
	handler: async (req, h) => {
		try {
			return await BeaconService.updateBeacon(req.params.beaconId, req.payload);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.deleteBeacon = {
	tags: ['api', 'beacon'],
	description: '비콘을 삭제합니다.',
	validate: {
		params: Joi.object({
			beaconId: Joi.string().description('비콘 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await BeaconService.deleteBeacon(req.params.beaconId);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};
