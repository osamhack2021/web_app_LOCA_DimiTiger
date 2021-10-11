<<<<<<< HEAD
const Beacon = require('../models/beacon');
const Location = require('../models/location');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	BeaconNotFoundError: createError('BeaconNotFoundError'),
=======
const Boom = require('@hapi/boom');
const Beacon = require('../models/beacon');

const Errors = (exports.Errors = {
	BeaconNotFoundError: () => Boom.notFound('BeaconNotFoundError'),
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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

<<<<<<< HEAD
	if (!beacon) throw new Errors.BeaconNotFoundError();
=======
	if (!beacon) throw Errors.BeaconNotFoundError();
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070

	for (const key in fields) {
		beacon[key] = fields[key];
	}

	await beacon.save();

	return beacon;
};

exports.deleteBeacon = async (_id) => {
	return await exports.updateBeacon(_id, { deleted: true });
};
