const User = require('../models/user');
const Location = require('../models/location');
const LocationLog = require('../models/location-log');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {});

exports.getLocationLogs = async ({ rangeStart, rangeEnd, offset, limit, ...filters }) => {
	return await LocationLog.find({
		createdAt: {
			$gte: rangeStart || new Date(0), 
			$lte: rangeEnd || new Date(),
		}
	}).find(filters).sort({ createdAt: -1 }).skip(offset || 0).limit(limit || 10).populate('location').populate('user');
};

exports.createLocationLog = async ({ user, location }) => {
	await LocationLog.updateMany({ user, active: true }, { active: false });
	return await new LocationLog({ user, location }).save();
};
