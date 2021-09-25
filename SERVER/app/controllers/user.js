const Boom = require('@hapi/boom');
const Joi = require('joi');
const UserService = require('../services/user');

exports.getUsers = {
	tags: ['api', 'user'],
	description: '사용자 목록을 가져옵니다.',
	validate: {},
	handler: async (req, h) => {
		try {
			return await UserService.getUsers();
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};

exports.createUsers = {
	tags: ['api', 'user'],
	validate: {
		payload: Joi.object({
			serial: Joi.string().required(),
			name: Joi.string().required(),
			password: Joi.string().required(),
		}),
	},
	handler: async (req, h) => {
		/* todo
		 * 권한 체크
		 * 관리자인 경우만 가능 */
		try {
			return await UserService.createUsers(req.payload);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};

exports.updateUsers = {
	auth: {
		mode: 'optional',
	},
	tags: ['api', 'user'],
	validate: {
		query: Joi.object({
			userId: Joi.string().description('사용자 _id'),
		}),
		payload: Joi.object({
			name: Joi.string(),
			phone: Joi.string(),
			email: Joi.string(),
			password: Joi.string(),
		}),
	},
	handler: async (req, h) => {
		/* todo
		 * 권한 체크
		 * 관리자인 경우 무조건 가능
		 * 관리자가 아닌 경우 본인의 정보만 수정 가능 */
		try {
			return await UserService.updateUsers(req.query.userId, req.payload);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};

exports.registerUsers = {
	auth: {
		mode: 'optional',
	},
	tags: ['api', 'user'],
	validate: {
		payload: Joi.object({
			identity: Joi.object({
				serial: Joi.string().required(),
				name: Joi.string().required(),
				password: Joi.string().required(),
			}),
			register: Joi.object({
				phone: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string().required(),
			}),
		}),
	},
	handler: async (req, h) => {
		try {
			return await UserService.registerUsers(
				req.payload.identity,
				req.payload.register
			);
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};
