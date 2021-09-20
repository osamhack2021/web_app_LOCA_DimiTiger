const User = require('../models/user');
const Location = require('../models/location');
const LocationLog = require('../models/location-log');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {});

exports.getCurrentLocationLogs = async () => {
	return await LocationLog.find({ active: true });
};

exports.getLocationLogByUser = async ({ user }) => {
	return await Location.find({ user });
};
exports.getLocationLogByLocation = async ({ location }) => {
	return await Location.find({ location });
};

exports.createLocationLog = async ({ user, location }) => {
	return await new LocationLog({ user, location }).save();
};
