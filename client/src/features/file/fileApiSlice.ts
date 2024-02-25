import { apiSlice } from '../../app/api/apiSlice';

export const fileApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		uploadFiles: builder.mutation({
			query: (formData) => ({
				url: '/upload',
				method: 'POST',
				body: formData,
			}),
		}),
	}),
});

export const { useUploadFilesMutation } = fileApiSlice;
