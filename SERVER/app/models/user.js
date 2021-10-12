const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const argon2 = require('argon2');
const rankTypes = require('../utils/rank-types');

const userSchema = new mongoose.Schema(
	{
		// 군번
		serial: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			default: null,
			trim: true,
		},
		email: {
			type: String,
			default: null,
			trim: true,
		},
		rank: {
			type: String,
			enum: Object.values(rankTypes),
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		password: {
			type: String,
			required: true,
			select: false,
			trim: true,
		},
		registered: {
			type: Boolean,
			default: false,
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

userSchema.statics.hashPassword = function hashPassword(password) {
	return argon2.hash(password);
};
userSchema.methods.verifyPassword = function verifyPassword(password) {
	console.log(this.password, password);
	return argon2.verify(this.password, password);
};

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
