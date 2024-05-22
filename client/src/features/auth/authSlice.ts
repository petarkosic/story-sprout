import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: JSON.parse(localStorage.getItem('user')!) || null,
	accessToken: localStorage.getItem('accessToken') || null,
	status: 'idle',
	error: '',
};

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:5000/api/v1/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
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
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/v1/auth/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(credentials),
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

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutUser: (state) => {
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
			});
	},
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
