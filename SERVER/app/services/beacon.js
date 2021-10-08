const Beacon = require('../models/beacon');
const Location = require('../models/location');
const { createError } = require('../utils/error');

const Errors = (exports.Errors = {
	BeaconNotFoundError: createError('BeaconNotFoundError'),
});

exports.getBeacons = async () => {
	return await Beacon.find({ deleted: false })
		.sort({ createdAt: -1 })
		.populate('location');
};

exports.getBeacon = async (filters) => {
	return await Beacon.find(filters).populate('location');
};

exports.createBeacon = async ({ location, region }) => {
	return await new Beacon({ location, region }).save();
};

exports.updateBeacon = async (_id, fields) => {
	const beacon = await Beacon.findById(_id).exec();

	if (!beacon) throw new Errors.BeaconNotFoundError();

	for (const key in fields) {
		beacon[key] = fields[key];
	}

	await beacon.save();

	return beacon;
};

exports.deleteBeacon = async (_id) => {
	return await exports.updateBeacon(_id, { deleted: true });
};
