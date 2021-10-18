class BaseError extends Error {}

function createErrorFactory(BaseError) {
	return function createError(name, init) {
		class E extends BaseError {
			constructor(message) {
				super(message);
				this.name = name;
				init && init.apply(this, arguments);
			}
		}
		Object.defineProperty(E, 'name', { value: name });
		return E;
	};
}

module.exports = {
	BaseError,
	createError: createErrorFactory(BaseError),
	createErrorFactory,
};
