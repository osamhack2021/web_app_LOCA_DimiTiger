const jwt = require('jsonwebtoken');

exports.generateToken = async (data, expiresIn) => {
	const token = jwt.sign(data, process.env.JWT_SECRET, {
		expiresIn,
	});
	return token;
};

exports.verifyToken = async (token) => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	return decoded;
};
