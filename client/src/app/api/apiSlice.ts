import {
	createApi,
	fetchBaseQuery,
	BaseQueryFn,
	FetchBaseQueryError,
	FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';

interface AuthState {
	token: string | null;
}

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3500',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as { auth: AuthState }).auth.token;

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}

		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	FetchArgs, // Args
	unknown, // Result
	FetchBaseQueryError, // Error
	{ shout?: boolean } // DefinitionExtraOptions
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	// If you want, handle other status codes, too
	if (result?.error?.status === 403) {
		// console.log('sending refresh token');

		// send refresh token to get new access token
		const refreshResult = await baseQuery(
			{ url: '/auth/refresh' },
			api,
			extraOptions,
		);

		if (refreshResult?.data) {
			// store the new token
			api.dispatch(setCredentials({ ...refreshResult.data }));

			// retry original query with new access token
			result = await baseQuery(args, api, extraOptions);
		} else {
			if (refreshResult?.error?.status === 403) {
				refreshResult.error.data = {
					message: 'Your login has expired',
				};
			}
			return refreshResult;
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User', 'File'],
	endpoints: () => ({}),
});
