const Boom = require('@hapi/boom');
const Joi = require('joi');
const UserService = require('../services/user');

exports.getUsers = {
	tags: ['api', 'public-api', 'user'],
	description: '사용자 목록을 가져옵니다.',
	validate: {},
	handler: async (request, h) => {
		try {
			return await UserService.getUsers();
		} catch (err) {
			throw Boom.internal(err);
		}
	},
};
