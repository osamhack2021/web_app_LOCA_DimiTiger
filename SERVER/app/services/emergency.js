const Boom = require('@hapi/boom');
const Emergency = require('../models/emergency');

const Errors = (exports.Errors = {
	EmergencyNotFoundError: () => Boom.notFound('EmergencyNotFoundError'),
});

exports.getEmergencies = async ({ page, limit }) => {
	return await Emergency.paginate(
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
			populate: ['creator'],
		}
	);
};

exports.getEmergency = async (_id) => {
	const emergency = await Emergency.findById(_id).exec();
	if (!emergency) throw Errors.EmergencyNotFoundError();
	return emergency;
};

exports.createEmergency = async ({ content, emergency, creator }) => {
	return await new Emergency({ content, emergency, creator }).save();
};

exports.addEmergencyAdditionalReport = async (_id, fields) => {
	const emergency = await Emergency.findById(_id).exec();

	if (!emergency) throw Errors.EmergencyNotFoundError();

	emergency.additionalReport.push(fields);

	await emergency.save();

	return emergency;
};

exports.updateEmergency = async (_id, fields) => {
	const emergency = await Emergency.findById(_id).exec();

	if (!emergency) throw Errors.EmergencyNotFoundError();

	for (const key in fields) {
		emergency[key] = fields[key];
	}

	await emergency.save();

	return emergency;
};

exports.deleteEmergency = async (_id) => {
	return await exports.updateEmergency(_id, { deleted: true });
};

exports.deactivateEmergency = async (_id) => {
	return await exports.updateEmergency(_id, { active: false });
};
