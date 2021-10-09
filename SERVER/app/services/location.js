const Location = require('../models/location');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	LocationNotFoundError: createError('LocationNotFoundError'),
});

exports.getLocations = async ({ page, limit }) => {
	return await Location.paginate(
		{
			deleted: false,
		},
		{
			page: page || 1,
			limit: limit || 10,
			sort: {
				createdAt: -1,
			},
		}
	);
};

exports.getLocation = async (_id) => {
	return await Location.findById(_id);
};

exports.createLocation = async ({ name, ui }) => {
	return await new Location({ name, ui }).save();
};

exports.updateLocation = async (_id, fields) => {
	const location = await Location.findById(_id).exec();

	if (!location) throw new Errors.LocationNotFoundError();

	for (const key in fields) {
		location[key] = fields[key];
	}

	await location.save();

	return location;
};

exports.deleteLocation = async (_id) => {
	return await exports.updateLocation(_id, { deleted: true });
};
