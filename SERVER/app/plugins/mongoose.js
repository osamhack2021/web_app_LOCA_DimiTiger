const mongoose = require('mongoose');
const glob = require('glob');
const GracefulExceptions = require('node-graceful');
const path = require('path');

exports.plugin = {
	name: 'mongoose',
	register: async (server, options) => {
		mongoose.connection.on('connected', () => {
			server.logger.info('MongoDB connected');
		});

		mongoose.connection.on('disconnected', () => {
			server.logger.info('MongoDB disconnected');
		});

		mongoose.connection.on('error', (err) => {
			server.logger.error('MongoDB error: %s', err);
		});

		GracefulExceptions.on('exit', async () => {
			try {
				await mongoose.connection.close();
				server.logger.info('MongoDB disconnected through app termination');
			} catch (err) {
				server.logger.error(
					'Error occured while closing MongoDB connection: %s',
					err
				);
			}
		});

		await mongoose.connect(options.uri, {}, (err) => {
			if (err) {
				server.logger.error(err);
				throw err;
			}
		});

		const models = glob.sync(path.resolve(__dirname, '../models/*.js'));
		models.forEach((model) => {
			require(model);
		});

		postLoad(server);
	},
};

async function postLoad(server) {
	const User = require('../models/user');

	// Create First Admin
	const users = await User.find({
		deleted: false,
	}).exec();
	if (users.length === 0) {
		await new User({
			id: 'admin',
			name: '최고관리자',
			serial: '12-345678',
			phone: '01012345678',
			email: 'admin@admin.com',
			isAdmin: true,
			password: await User.hashPassword('admin'),
		}).save();
		server.logger.info('MongoDB First User Created');
	}
}
