const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			default: null,
			trim: true,
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
	return argon2.verify(this.password, password);
};

module.exports = mongoose.model('User', userSchema);
