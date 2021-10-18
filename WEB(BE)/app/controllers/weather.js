const Boom = require('@hapi/boom');
const Joi = require('joi');
const BeaconService = require('../services/beacon');
const { removeUndefined } = require('../utils/object-editor');
const got = require('got');
const weather = require('openweather-apis');
weather.setLang('kr');
weather.setAPPID(process.env.OPENWEATHER_API_KEY);

exports.getWeathers = {
	tags: ['api', 'weather'],
	description: '날씨를 가져옵니다.',
	validate: {
		query: Joi.object({
			city: Joi.string().required(),
		}),
	},
	handler: async (req, h) => {
		try {
			return await getWeather(req.query.city);
		} catch (err) {
			if (Boom.isBoom(err)) throw err;
			throw Boom.internal(err);
		}
	},
};

async function getWeather(city) {
	return new Promise((resolve, reject) => {
		weather.setCity(city);

		weather.getSmartJSON(function (err, smart) {
			if (err) return reject(err);
			return resolve(smart);
		});
	});
}
