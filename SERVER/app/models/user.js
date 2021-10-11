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
<<<<<<< HEAD
			enum: rankTypes,
=======
			enum: Object.values(rankTypes),
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
<<<<<<< HEAD
=======
		registered: {
			type: Boolean,
			default: false,
		},
>>>>>>> ea2fd2bc8e50c20f9062a8bb0168195300911070
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
