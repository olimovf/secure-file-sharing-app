const addTimestampToFileName = (fileName) => {
	const timestamp = Date.now().toString();
	const dot = fileName.lastIndexOf('.');
	return fileName.slice(0, dot) + '_' + timestamp + fileName.slice(dot);
};

const removeTimestampFromFileName = (fileName) => {
	const _ = fileName.lastIndexOf('_');
	const dot = fileName.lastIndexOf('.');
	return fileName.slice(0, _) + fileName.slice(dot);
};

module.exports = { addTimestampToFileName, removeTimestampFromFileName };
