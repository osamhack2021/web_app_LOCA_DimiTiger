const mongoose = require('mongoose');

const beaconRegionSchema = new mongoose.Schema(
	{
		uuid: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		major: {
			type: mongoose.Schema.Types.Number,
		},
		minor: {
			type: mongoose.Schema.Types.Number,
		},
	},
)

const beaconSchema = new mongoose.Schema(
	{
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: require('./location'),
			required: true,
		},
		region: {
			type: beaconRegionSchema,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				ret.region.identifier = ret.region._id;
				return ret;
			},
			versionKey: false,
		},
	}
);

module.exports = mongoose.model('Beacon', beaconSchema);
