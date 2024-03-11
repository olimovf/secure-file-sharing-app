import { apiSlice } from '../../app/api/apiSlice';

export const fileApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		uploadFiles: builder.mutation({
			query: (formData) => ({
				url: '/files/upload',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: [{ type: 'File', id: 'LIST' }],
		}),
		getFiles: builder.query({
			query: () => ({
				url: '/files',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError;
				},
			}),
			providesTags: (result) => {
				if (result?.length) {
					return [
						{ type: 'File', id: 'LIST' },
						...result.map((file: FileType) => ({ type: 'File', id: file._id })),
					];
				}
				return [{ type: 'File', id: 'LIST' }];
			},
		}),
		downloadFile: builder.mutation({
			query: ({ id, name }) => ({
				url: `/files/download?id=${id}`,
				method: 'GET',
				cache: 'no-cache',
				responseHandler: async (resp) => {
					if (resp.status !== 200) return;
					const link = document.createElement('a');
					const url = window.URL || window.webkitURL;
					const blob = url.createObjectURL(await resp.blob());
					link.href = blob;
					link.download = name;
					link.click();
					url.revokeObjectURL(blob);
					return null;
				},
			}),
		}),
		deleteFile: builder.mutation({
			query: ({ id }) => ({
				url: '/files',
				method: 'DELETE',
				body: { id },
			}),
			invalidatesTags: (_, __, arg) => [{ type: 'File', id: arg.id }],
		}),
		updateFile: builder.mutation({
			query: (initialFile) => ({
				url: '/files',
				method: 'PATCH',
				body: {
					...initialFile,
				},
			}),
			invalidatesTags: (_, __, arg) => [{ type: 'File', id: arg.id }],
		}),
	}),
});

export const {
	useUploadFilesMutation,
	useGetFilesQuery,
	useDownloadFileMutation,
	useDeleteFileMutation,
	useUpdateFileMutation,
} = fileApiSlice;
