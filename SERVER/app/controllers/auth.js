const Joi = require('joi');
const Boom = require('@hapi/boom');
const ms = require('ms');
const config = require('../config/config');
const AuthService = require('../services/auth.js');
const TokenTypes = require('../utils/token-types');
const User = require('../models/user');

exports.token = {
	description: '군번과 비밀번호로 로그인을 합니다.',
	tags: ['api', 'public-api', 'auth'],
	auth: false,
	validate: {
		payload: Joi.object({
			serial: Joi.string().required().description('ID').default('00-000000'),
			password: Joi.string()
				.required()
				.description('비밀번호')
				.default('admin'),
		}).label('auth_token'),
	},
	handler: async (request, h) => {
		const user = await User.findOne({
			serial: request.payload.serial,
		})
			.select('+password')
			.exec();

		if (!user) throw Boom.unauthorized('등록되지 않은 군번입니다.');
		if (!(await user.verifyPassword(request.payload.password)))
			throw Boom.unauthorized('비밀번호가 일치하지 않습니다.');

		const accessToken = await AuthService.generateToken(
			user,
			TokenTypes.ACCESS
		);
		const refreshToken = await AuthService.generateToken(
			user,
			TokenTypes.REFRESH
		);

		return {
			access_token: accessToken,
			refresh_token: refreshToken,
			expires_in: ms(config.auth.expiresIn[TokenTypes.ACCESS]) / 1000,
			token_type: 'Bearer',
		};
	},
};

exports.refresh = {
	description: 'Refresh 토큰으로 Access 토큰을 새로 발급받습니다.',
	tags: ['api', 'public-api', 'auth'],
	auth: false,
	validate: {
		payload: Joi.object({
			refresh_token: Joi.string().required().description('Refresh 토큰'),
		}).label('auth_refresh'),
	},
	handler: async (request, h) => {
		try {
			const decoded = await AuthService.verifyToken(
				request.payload.refresh_token,
				TokenTypes.REFRESH
			);
			const admin = await User.findOne({
				_id: decoded._id,
				deleted: false,
			}).exec();

			delete decoded.iat;
			delete decoded.exp;

			const accessToken = await AuthService.generateToken(
				admin,
				TokenTypes.ACCESS
			);

			return {
				access_token: accessToken,
				refresh_token: request.payload.refresh_token,
				expires_in: ms(config.auth.expiresIn[TokenTypes.ACCESS]) / 1000,
				token_type: 'Bearer',
			};
		} catch (err) {
			if (err instanceof AuthService.Errors.TokenExpiredError) {
				throw Boom.unauthorized(err);
			}
			throw Boom.unauthorized(err);
		}
	},
};
