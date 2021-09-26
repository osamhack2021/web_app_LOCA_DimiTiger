const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		data: JSON,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Setting', settingSchema);
