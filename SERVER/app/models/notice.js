const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
			trim: true,
		},
		emergency: {
			type: Boolean,
			default: false,
		},
		creator: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
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

module.exports = mongoose.model('Notice', noticeSchema);
