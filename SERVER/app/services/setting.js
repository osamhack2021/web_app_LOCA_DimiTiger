const Boom = require('@hapi/boom');
const Setting = require('../models/setting');

const Errors = (exports.Errors = {
	SettingNotFoundError: () => Boom.notFound('SettingNotFoundError'),
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
	if (!setting) throw Errors.SettingNotFoundError();
	return setting;
};

exports.getCurrentSetting = async () => {
	return await Setting.findOne().sort({ createdAt: -1 }).exec();
};

exports.createSetting = async ({ creator, data }) => {
	return await new Setting({ creator, data }).save().exec();
};
