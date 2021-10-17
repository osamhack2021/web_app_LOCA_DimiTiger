const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const additionalReportSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		creator: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const emergencySchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		additionalReport: [additionalReportSchema],
		active: {
			type: Boolean,
			default: true,
		},
		deleted: {
			type: Boolean,
			default: false,
			select: false,
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

emergencySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Emergency', emergencySchema);
