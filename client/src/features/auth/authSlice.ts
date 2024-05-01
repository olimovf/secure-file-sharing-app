import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: { token: null } as AuthStateType,
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken } = action.payload;
			state.token = accessToken;
		},
		logOut: (state) => {
			state.token = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: { auth: AuthStateType }) =>
	state.auth.token;
