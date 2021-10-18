exports.removeUndefined = (obj) => {
	const newObj = { ...obj };
	Object.keys(newObj).forEach(
		(key) => newObj[key] === undefined && delete newObj[key]
	);
	return newObj;
};
