const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const locationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		ui: JSON,
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

locationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Location', locationSchema);
