const Boom = require('@hapi/boom');
const Joi = require('joi');
const LocationService = require('../services/location');
const { removeUndefined } = require('../utils/object-editor');

exports.getLocations = {
	tags: ['api', 'location'],
	description: '위치 목록을 가져옵니다.',
	validate: {
		query: Joi.object({
			page: Joi.number().description('페이지'),
			limit: Joi.number().description('가져올 개수'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await LocationService.getLocations(removeUndefined(req.query));
		} catch (err) {
<<<<<<< HEAD
=======
			if (Boom.isBoom(err)) throw err;
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
=======
			if (Boom.isBoom(err)) throw err;
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
=======
			if (Boom.isBoom(err)) throw err;
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
=======
			if (Boom.isBoom(err)) throw err;
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
			throw Boom.internal(err);
		}
	},
};

exports.deleteLocation = {
	tags: ['api', 'location'],
	description: '위치를 삭제합니다.',
	validate: {
		params: Joi.object({
			locationId: Joi.string().description('위치 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await LocationService.deleteLocation(req.params.locationId);
		} catch (err) {
<<<<<<< HEAD
=======
			if (Boom.isBoom(err)) throw err;
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
			throw Boom.internal(err);
		}
	},
};
