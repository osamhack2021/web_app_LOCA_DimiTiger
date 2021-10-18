const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

settingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Setting', settingSchema);
