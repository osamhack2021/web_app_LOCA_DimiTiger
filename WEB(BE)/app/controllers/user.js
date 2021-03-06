const Boom = require('@hapi/boom');
const Joi = require('joi');
const UserService = require('../services/user');
const rankTypes = require('../utils/rank-types');
const { removeUndefined } = require('../utils/object-editor');

exports.getUsers = {
	tags: ['api', 'user'],
	description: '사용자 목록을 가져옵니다.',
	validate: {
		query: Joi.object({
			page: Joi.number().description('페이지'),
			limit: Joi.number().description('가져올 개수'),
			name: Joi.string().description('사용자 이름'),
			serial: Joi.string().description('군번'),
			registered: Joi.boolean().description('회원가입여부'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await UserService.getUsers(removeUndefined(req.query));
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.getUsersStream = {
	tags: ['api', 'user'],
	description: '사용자 목록을 가져옵니다.',
	validate: {
		query: Joi.object({
			page: Joi.number().description('페이지'),
			limit: Joi.number().description('가져올 개수'),
			name: Joi.string().description('사용자 이름'),
			serial: Joi.string().description('군번'),
			registered: Joi.boolean().description('회원가입여부'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await UserService.getUsers(removeUndefined(req.query));
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.getUser = {
	tags: ['api', 'user'],
	description: '사용자를 가져옵니다.',
	validate: {
		params: Joi.object({
			userId: Joi.string().description('사용자 _id'),
		}),
	},
	handler: async (req, h) => {
		try {
			return await UserService.getUser(req.params.userId);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.me = {
	tags: ['api', 'user'],
	description: '로그인된 사용자 정보를 가져옵니다.',
	validate: {},
	handler: async (req, h) => {
		try {
			return req.auth.credentials;
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
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
			rank: Joi.string()
				.required()
				.valid(...Object.values(rankTypes)),
		}),
	},
	handler: async (req, h) => {
		/* todo
		 * 권한 체크
		 * 관리자인 경우만 가능 */
		try {
			return await UserService.createUsers(req.payload);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.updateUser = {
	auth: {
		mode: 'optional',
	},
	tags: ['api', 'user'],
	validate: {
		params: Joi.object({
			userId: Joi.string().description('사용자 _id'),
		}),
		payload: Joi.object({
			name: Joi.string(),
			phone: Joi.string(),
			email: Joi.string(),
			password: Joi.string(),
			rank: Joi.string().valid(...Object.values(rankTypes)),
		}),
	},
	handler: async (req, h) => {
		/* todo
		 * 권한 체크
		 * 관리자인 경우 무조건 가능
		 * 관리자가 아닌 경우 본인의 정보만 수정 가능 */
		try {
			return await UserService.updateUser(req.params.userId, req.payload);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
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
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

exports.deleteUser = {
	tags: ['api', 'user'],
	validate: {
		params: Joi.object({
			userId: Joi.string().description('사용자 _id'),
		}),
	},
	handler: async (req, h) => {
		/* todo
		 * 권한 체크
		 * 관리자인 경우 무조건 가능
		 * 관리자가 아닌 경우 본인의 정보만 수정 가능 */
		try {
			return await UserService.deleteUser(req.params.userId);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};
