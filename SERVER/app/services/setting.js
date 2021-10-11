<<<<<<< HEAD
const Setting = require('../models/setting');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	SettingNotFoundError: createError('SettingNotFoundError'),
=======
const Boom = require('@hapi/boom');
const Setting = require('../models/setting');

const Errors = (exports.Errors = {
	SettingNotFoundError: () => Boom.notFound('SettingNotFoundError'),
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
});

exports.getSettings = async ({ page, limit }) => {
	return await Setting.paginate(
		{},
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

exports.getSetting = async (_id) => {
	const setting = await Setting.findById(_id).exec();
<<<<<<< HEAD
	if (!setting) throw new Errors.SettingNotFoundError();
=======
	if (!setting) throw Errors.SettingNotFoundError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
	return setting;
};

exports.getCurrentSetting = async () => {
	return await Setting.findOne().sort({ createdAt: -1 }).exec();
};

exports.createSetting = async ({ creator, data }) => {
	return await new Setting({ creator, data }).save().exec();
};
