const mongoose = require('mongoose');

const locationLogSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		users: {
			type: 'User',
			default: [],
		},
		ui: JSON,
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

module.exports = mongoose.model('LocationLog', locationLogSchema);
