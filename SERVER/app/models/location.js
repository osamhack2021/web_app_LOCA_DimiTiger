const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
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

module.exports = mongoose.model('Location', locationSchema);
