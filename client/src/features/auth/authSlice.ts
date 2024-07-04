import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../shared/utils/types';

const initialState = {
	user: JSON.parse(localStorage.getItem('user')!) || null,
	accessToken: localStorage.getItem('accessToken') || null,
	status: 'idle',
	error: '',
};

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await fetch('http://localhost:5000/api/v1/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
				credentials: 'include',
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('user', JSON.stringify(data));

				return data;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (
		{ firstName, lastName, nickname, email, password }: User,
		{ rejectWithValue }
	) => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/v1/auth/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						firstName,
						lastName,
						nickname,
						email,
						password,
					}),
				}
			);

			const data = await response.json();

			if (response.ok) {
				return data.user;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const refreshToken = createAsyncThunk(
	'auth/refreshToken',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/v1/auth/refresh',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				}
			);

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem('accessToken', data.newAccessToken);

				return data.newAccessToken;
			} else {
				await dispatch(logoutUser()).unwrap();

				return rejectWithValue(data.message);
			}
		} catch (error) {
			await dispatch(logoutUser()).unwrap();

			return rejectWithValue(error);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:5000/api/v1/auth/logout', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (response.ok) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('user');

				return;
			} else {
				return rejectWithValue(response.statusText);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearState: (state) => {
			state.user = null;
			state.accessToken = null;
			state.error = '';
			state.status = 'idle';
			localStorage.removeItem('accessToken');
			localStorage.removeItem('user');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'success';
				state.user = action.payload;
				state.accessToken = action.payload.accessToken;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.error.message!;
			})
			.addCase(registerUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'success';
				state.user = action.payload;
				state.accessToken = action.payload.accessToken;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.error.message!;
			})
			.addCase(refreshToken.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.status = 'success';
				state.accessToken = action.payload;
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.error.message!;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.accessToken = null;
				state.error = '';
				state.status = 'idle';
			});
	},
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
