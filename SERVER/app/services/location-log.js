const User = require('../models/user');
const Location = require('../models/location');
const LocationLog = require('../models/location-log');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {});

exports.getLocationLogs = async ({ rangeStart, rangeEnd, ...filters }) => {
	return await LocationLog.find({
		created_on: {
			$gte: rangeStart, 
			$lt: rangeEnd
		}
	}).find(filters).populate('location').populate('user');
};

exports.createLocationLog = async ({ user, location }) => {
	await LocationLog.updateMany({ user, active: true }, { active: false });
	return await new LocationLog({ user, location }).save();
};
