type MutationType = {
	isLoading: boolean;
	isError: boolean;
	error: {
		status: number;
		data: {
			message: string;
		};
	};
};

type FileType = {
	_id: string;
	name: string;
	size: number;
	password?: string;
	expirationTime?: string;
	createdBy: string;
	sharedWith: string[];
};
