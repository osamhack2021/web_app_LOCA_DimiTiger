const User = require('../models/user');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	UserNotFoundError: createError('UserNotFoundError'),
});

exports.getUsers = async () => {
	const query = User.find();

	return await query.exec();
};
