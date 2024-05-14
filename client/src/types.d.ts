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
	sharedBy: string;
	sharedWith: string;
};

type UserType = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	roles: string[];
	verified?: boolean;
};

type ActivityType = {
	_id: string;
	userId: string;
	ip: string;
	action: string;
	status: string;
	createdAt: string;
};

type AuthStateType = {
	token: string | null;
};
