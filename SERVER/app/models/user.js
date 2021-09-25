const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		// 군번
		serial: {
			type: String,
			unique: true,
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

module.exports = mongoose.model('User', userSchema);
