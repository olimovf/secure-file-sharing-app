import { apiSlice } from '../../app/api/apiSlice';

export const activityApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getActivities: builder.query({
			query: () => ({
				url: '/activity',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) => {
				if (result?.length) {
					return [
						{ type: 'Activity', id: 'LIST' },
						...result.map((act: ActivityType) => ({
							type: 'Activity',
							id: act._id,
						})),
					];
				}
				return [{ type: 'Activity', id: 'LIST' }];
			},
		}),
	}),
});

export const { useGetActivitiesQuery } = activityApiSlice;
