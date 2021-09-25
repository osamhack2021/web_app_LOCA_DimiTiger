const { createError } = require('../utils/error');
const TokenTypes = require('../utils/token-types');
const JwtAuth = require('../utils/jwt-auth');
const config = require('../config/config');

const Errors = (exports.Errors = {
	JWTError: createError('JWTError'),
	TokenExpiredError: createError('TokenExpiredError'),
	TokenTypeMismatchError: createError('TokenTypeMismatchError'),
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
		throw new Errors.TokenExpiredError();
	}
	if (result.tokenType !== tokenType) {
		throw new Errors.TokenTypeMismatchError();
	}

	return result;
};
