import { acceptedFileTypes } from './constants';
import {
	faFileWord,
	faFilePdf,
	faFileExcel,
	faFilePowerpoint,
	faFileLines,
} from '@fortawesome/free-regular-svg-icons';

export const formatBytes = (bytes: number): string => {
	if (bytes === 0) return '0 Bytes';
	const k = 2 ** 10;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

type T = (typeof acceptedFileTypes)[number];

export const fileIcons = (type: T) => {
	switch (type) {
		case '.docx':
		case '.doc':
			return faFileWord;

		case '.pdf':
			return faFilePdf;

		case '.xls':
		case '.xlsx':
			return faFileExcel;

		case '.ppt':
		case '.pptx':
			return faFilePowerpoint;

		default:
			return faFileLines;
	}
};
