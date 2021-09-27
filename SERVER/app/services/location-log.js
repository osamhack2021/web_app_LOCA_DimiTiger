const User = require('../models/user');
const Location = require('../models/location');
const LocationLog = require('../models/location-log');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {});

exports.getLocationLogs = async (filters) => {
	return await LocationLog.find(filters).populate('location');
};

exports.createLocationLog = async ({ user, location }) => {
	await LocationLog.updateMany({ user, location, active: false });
	return await new LocationLog({ user, location }).save();
};
