const Joi = require('joi');
const fs = require('fs');
const Boom = require('@hapi/boom');

exports.upload = {
	tags: ['api', 'file'],
	description: '파일을 업로드합니다.',
	validate: {
		payload: Joi.object({
			file: Joi.any().meta({ swaggerType: 'file' }).description('file'),
		}),
	},
	plugins: {
		'hapi-swagger': {
			payloadType: 'form',
		},
	},
	payload: {
		maxBytes: 209715200,
		output: 'stream',
		parse: true,
		multipart: true, // <-- this fixed the media type error
		allow: 'multipart/form-data',
	},
	handler: (request, h) => {
		const data = request.payload;
		if (data.file) {
			const name = data.file.hapi.filename;
			const saveName = `${new Date().getTime()}_${name}`;
			const path = __dirname + '/../static/uploads/' + saveName;
			const file = fs.createWriteStream(path);

			file.on('error', (err) => console.error(err));

			data.file.pipe(file);

			data.file.on('end', (err) => {
				const ret = {
					filename: data.file.hapi.filename,
					headers: data.file.hapi.headers,
				};
				return JSON.stringify(ret);
			});
			return {
				filename: saveName,
				headers: data.file.headers,
			};
		}

		return Boom.forbidden('error');
	},
};
