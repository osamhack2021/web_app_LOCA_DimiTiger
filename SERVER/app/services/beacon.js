const Boom = require('@hapi/boom');
const Beacon = require('../models/beacon');

const Errors = (exports.Errors = {
	BeaconNotFoundError: () => Boom.notFound('BeaconNotFoundError'),
});

exports.getBeacons = async ({ page, limit }) => {
	return await Beacon.paginate(
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
			populate: ['location'],
		}
	);
};

exports.getBeacon = async (filters) => {
	return await Beacon.find(filters).populate('location');
};

exports.createBeacon = async ({ location, region }) => {
	return await new Beacon({ location, region }).save();
};

exports.updateBeacon = async (_id, fields) => {
	const beacon = await Beacon.findById(_id).exec();

	if (!beacon) throw Errors.BeaconNotFoundError();

	for (const key in fields) {
		beacon[key] = fields[key];
	}

	await beacon.save();

	return beacon;
};

exports.deleteBeacon = async (_id) => {
	return await exports.updateBeacon(_id, { deleted: true });
};
