// const Boom = require('@hapi/boom');
const LocationLog = require('../models/location-log');

// const Errors = (exports.Errors = {});

exports.getLocationLogs = async ({
	rangeStart,
	rangeEnd,
	page,
	limit,
	...rest
}) => {
	return await LocationLog.paginate(
		{
			...rest,
			createdAt: {
				$gte: rangeStart || new Date(0),
				$lte: rangeEnd || new Date(),
			},
		},
		{
			page: page || 1,
			limit: limit || 10,
			pagination: limit != 0,
			sort: {
				createdAt: -1,
			},
			populate: ['location', 'user'],
		}
	);
};

exports.createLocationLog = async ({ user, location }) => {
	await LocationLog.updateMany({ user, active: true }, { active: false });
	return await new LocationLog({ user, location }).save();
};
