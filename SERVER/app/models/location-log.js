const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const locationLogSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: require('./user'),
			required: true,
		},
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: require('./location'),
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				delete ret.password;
				return ret;
			},
			versionKey: false,
		},
	}
);

locationLogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('LocationLog', locationLogSchema);
