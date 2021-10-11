<<<<<<< HEAD
const User = require('../models/user');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	UserNotFoundError: createError('UserNotFoundError'),
	UserAlreadyExistError: createError('UserAlreadyExistError'),
	PasswordNotMatchError: createError('PasswordNotMatchError'),
});

exports.getUsers = async ({ page, limit, name, serial }) => {
	return await User.paginate(
		{
=======
const Boom = require('@hapi/boom');
const User = require('../models/user');

const Errors = (exports.Errors = {
	UserNotFoundError: () => Boom.notFound('UserNotFoundError'),
	UserAlreadyExistError: () => Boom.conflict('UserAlreadyExistError'),
	PasswordNotMatchError: () => Boom.conflict('PasswordNotMatchError'),
});

exports.getUsers = async ({ page, limit, name, serial, ...fields }) => {
	return await User.paginate(
		{
			...fields,
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
			deleted: false,
			name: { $regex: name || '', $options: 'i' },
			serial: { $regex: serial || '', $options: 'i' },
		},
		{
			page: page || 1,
			limit: limit || 10,
			pagination: limit != 0,
			sort: {
				createdAt: -1,
			},
		}
	);
};

exports.getUser = async (_id) => {
	const query = User.findOne({ _id });

	return await query.exec();
};

exports.createUsers = async ({ serial, name, password, rank }) => {
	const existUser = await User.findOne({ serial, deleted: false });

<<<<<<< HEAD
	if (existUser) throw new Errors.UserAlreadyExistError();
=======
	if (existUser) throw Errors.UserAlreadyExistError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

	return await new User({
		serial,
		name,
		rank,
		password: await User.hashPassword(password),
	}).save();
};

exports.updateUser = async (_id, fields) => {
	const user = await User.findOne({
		_id,
	}).exec();

<<<<<<< HEAD
	if (!user) throw new Errors.UserNotFoundError();
=======
	if (!user) throw Errors.UserNotFoundError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

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

<<<<<<< HEAD
	if (!user) throw new Errors.UserNotFoundError();
	if (!(await user.verifyPassword(password)))
		throw new Errors.PasswordNotMatchError();
=======
	if (!user) throw Errors.UserNotFoundError();
	if (!(await user.verifyPassword(password)))
		throw Errors.PasswordNotMatchError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

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
<<<<<<< HEAD
		throw new Errors.PasswordNotMatchError();
=======
		throw Errors.PasswordNotMatchError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

	return user;
};

exports.emailLogin = async ({ email, password }) => {
	const user = User.findOne({
		email,
	}).exec();

	if (!(await user.verifyPassword(password)))
<<<<<<< HEAD
		throw new Errors.PasswordNotMatchError();
=======
		throw Errors.PasswordNotMatchError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

	return user;
};

exports.serialLogin = async ({ serial, password }) => {
	const user = User.findOne({
		serial,
	}).exec();

	if (!(await user.verifyPassword(password)))
<<<<<<< HEAD
		throw new Errors.PasswordNotMatchError();
=======
		throw Errors.PasswordNotMatchError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

	return user;
};

exports.deleteUser = async (_id) => {
	return await exports.updateUser(_id, { deleted: true });
};
