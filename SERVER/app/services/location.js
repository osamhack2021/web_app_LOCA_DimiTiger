const Boom = require('@hapi/boom');
const Location = require('../models/location');

const Errors = (exports.Errors = {
	LocationNotFoundError: () => Boom.notFound('LocationNotFoundError'),
});

exports.getLocations = async ({ page, limit }) => {
	return await Location.paginate(
		{
			deleted: false,
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

exports.getLocation = async (_id) => {
	return await Location.findById(_id);
};

exports.createLocation = async ({ name, ui }) => {
	return await new Location({ name, ui }).save();
};

exports.updateLocation = async (_id, fields) => {
	const location = await Location.findById(_id).exec();

	if (!location) throw Errors.LocationNotFoundError();

	for (const key in fields) {
		location[key] = fields[key];
	}

	await location.save();

	return location;
};

exports.deleteLocation = async (_id) => {
	return await exports.updateLocation(_id, { deleted: true });
};
