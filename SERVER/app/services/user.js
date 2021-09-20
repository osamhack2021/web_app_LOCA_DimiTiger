const User = require('../models/user');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	UserNotFoundError: createError('UserNotFoundError'),
	PasswordNotMatchError: createError('PasswordNotMatchError'),
});

exports.getUsers = async () => {
	const query = User.find();

	return await query.exec();
};

exports.getUser = async ({ id }) => {
	const query = User.find({ id });

	return await query.exec();
};

exports.createUsers = async ({ serial, name, password }) => {
	return await new User({
		serial,
		name,
		password: await User.hashPassword(password),
	}).save();
};

exports.updateUsers = async (_id, fields) => {
	const user = await User.findOne({
		_id,
	}).exec();

	if (!user) throw new Errors.UserNotFoundError();

	for (const key in fields) {
		if (key == 'password') user[key] = await User.hashPassword(fields[key]);
		else user[key] = fields[key];
	}

	await user.save();

	return user;
};

exports.registerUsers = async ({ serial, name, password }, fields) => {
	const user = await User.findOne({
		serial,
		name,
	})
		.select('+password')
		.exec();

	if (!user) throw new Errors.UserNotFoundError();
	if (!(await user.verifyPassword(password)))
		throw new Errors.PasswordNotMatchError();

	for (const key in fields) {
		if (key == 'password') user[key] = await User.hashPassword(fields[key]);
		else user[key] = fields[key];
	}

	await user.save();

	return user;
};

exports.idLogin = async ({ id, password }) => {
	const user = User.findOne({
		id,
	}).exec();

	if (!(await user.verifyPassword(password)))
		throw new Errors.PasswordNotMatchError();

	return user;
};

exports.emailLogin = async ({ email, password }) => {
	const user = User.findOne({
		email,
	}).exec();

	if (!(await user.verifyPassword(password)))
		throw new Errors.PasswordNotMatchError();

	return user;
};

exports.serialLogin = async ({ serial, password }) => {
	const user = User.findOne({
		serial,
	}).exec();

	if (!(await user.verifyPassword(password)))
		throw new Errors.PasswordNotMatchError();

	return user;
};
