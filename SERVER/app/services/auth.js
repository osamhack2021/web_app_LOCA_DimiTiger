const Boom = require('@hapi/boom');
const TokenTypes = require('../utils/token-types');
const JwtAuth = require('../utils/jwt-auth');
const config = require('../config/config');

const Errors = (exports.Errors = {
	JWTError: () => Boom.badData('JWTError'),
	TokenExpiredError: () => Boom.badData('TokenExpiredError'),
	TokenTypeMismatchError: () => Boom.badData('TokenTypeMismatchError'),
});

exports.generateToken = async (doc, tokenType, _expiresIn) => {
	const expiresIn = _expiresIn || config.auth.expiresIn[tokenType];
	return await JwtAuth.generateToken(
		{ _id: doc._id, serial: doc.serial, tokenType },
		expiresIn,
		tokenType !== TokenTypes.AUTH
	);
};

exports.verifyToken = async (token, tokenType) => {
	let result;

	result = await JwtAuth.verifyToken(token, tokenType !== TokenTypes.AUTH);

	if (!result) {
		throw Errors.TokenExpiredError();
	}
	if (result.tokenType !== tokenType) {
		throw Errors.TokenTypeMismatchError();
	}

	return result;
};
