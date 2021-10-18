/* eslint-disable no-undef */
const assert = require('assert');

const locationServices = require('../app/services/location');

describe('App test!', () => {
	before(() => {
		process.env.PORT = 8888;
		require('../index');
	});

	describe('user', () => {});
	describe('location', () => {
		it('createLocation', (done) => {
			locationServices
				.createLocation({
					name: '3d생활관',
					ui: { test: 'hi' },
				})
				.then((data) => {
					done();
				});
		});
		it('getLocations', function (done) {
			if (locationServices.getLocations) {
				locationServices.getLocations().then((data) => {
					console.log(data);
					done();
				});
			}
		});
	});
});
