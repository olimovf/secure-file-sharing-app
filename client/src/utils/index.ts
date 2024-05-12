export const formatBytes = (bytes: number): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 2 ** 10;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
