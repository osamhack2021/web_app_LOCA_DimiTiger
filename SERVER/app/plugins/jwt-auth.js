const hapiJwt = require('hapi-auth-jwt2');

const TokenTypes = require('../utils/token-types');
const JwtAuth = require('../utils/jwt-auth');
const User = require('../models/user');

module.exports = {
	name: 'jwt-auth',
	register(server, options) {
		server.register(hapiJwt);
		server.auth.strategy('jwt', 'jwt', {
			key: process.env.JWT_SECRET,
			validate: async (decoded, request, h) => {
				try {
					const result = await JwtAuth.verifyToken(request.auth.token);
					if (!result) {
						return {
							isValid: false,
							errorMessage: 'Token expired',
						};
					}
					if (result.tokenType !== TokenTypes.ACCESS) {
						return {
							isValid: false,
							errorMessage: 'Wrong token type given',
						};
					}
					const admin = await User.findOne({ _id: result._id });

					return {
						isValid: true,
						credentials: admin,
					};
				} catch (err) {
					if (err.name === 'JsonWebTokenError') {
						return {
							isValid: false,
							errorMessage: 'Bad token',
						};
					}
					server.logger.error(err);
					return {
						isValid: false,
						errorMessage: err.message,
					};
				}
			},
			urlKey: false,
			cookieKey: false,
			payloadKey: false,
		});
		server.auth.default('jwt');
	},
};
