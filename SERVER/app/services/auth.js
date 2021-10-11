<<<<<<< HEAD
const { createError } = require('../utils/error');
=======
const Boom = require('@hapi/boom');
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
const TokenTypes = require('../utils/token-types');
const JwtAuth = require('../utils/jwt-auth');
const config = require('../config/config');

const Errors = (exports.Errors = {
<<<<<<< HEAD
	JWTError: createError('JWTError'),
	TokenExpiredError: createError('TokenExpiredError'),
	TokenTypeMismatchError: createError('TokenTypeMismatchError'),
=======
	JWTError: () => Boom.badData('JWTError'),
	TokenExpiredError: () => Boom.badData('TokenExpiredError'),
	TokenTypeMismatchError: () => Boom.badData('TokenTypeMismatchError'),
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
		throw new Errors.TokenExpiredError();
	}
	if (result.tokenType !== tokenType) {
		throw new Errors.TokenTypeMismatchError();
=======
		throw Errors.TokenExpiredError();
	}
	if (result.tokenType !== tokenType) {
		throw Errors.TokenTypeMismatchError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
	}

	return result;
};
