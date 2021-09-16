const TokenTypes = require('../utils/token-types');

module.exports = {
	auth: {
		expiresIn: {
			[TokenTypes.AUTH]: '365 days',
			[TokenTypes.ACCESS]: '365 days',
			[TokenTypes.REFRESH]: '365 days',
		},
	},
};
