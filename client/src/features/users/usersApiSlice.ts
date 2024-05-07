import { apiSlice } from '../../app/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => ({
				url: '/users',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) => {
				if (result?.length) {
					return [
						{ type: 'User', id: 'LIST' },
						...result.map((user: UserType) => ({ type: 'User', id: user._id })),
					];
				}
				return [{ type: 'User', id: 'LIST' }];
			},
		}),
		addNewUser: builder.mutation({
			query: (initialUserData) => ({
				url: '/users',
				method: 'POST',
				body: {
					...initialUserData,
				},
			}),
			invalidatesTags: [{ type: 'User', id: 'LIST' }],
		}),
		updateUser: builder.mutation({
			query: (initialUserData) => ({
				url: '/users',
				method: 'PATCH',
				body: {
					...initialUserData,
				},
			}),
			invalidatesTags: (_, __, arg) => [{ type: 'User', id: arg.id }],
		}),
		deleteUser: builder.mutation({
			query: ({ id }) => ({
				url: '/users',
				method: 'DELETE',
				body: { id },
			}),
			invalidatesTags: (_, __, arg) => [{ type: 'User', id: arg.id }],
		}),
		verifyUser: builder.query({
			query: ({ userId, token }) => ({
				url: `/users/verify/${userId}/${token}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useAddNewUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useVerifyUserQuery,
} = usersApiSlice;
