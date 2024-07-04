import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle',
	error: '',
	isNicknameAvailable: false,
};

export const checkNickname = createAsyncThunk(
	'auth/checkNickname',
	async (nickname: string, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/v1/users/check-nickname?nickname=${nickname}`,
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
				return data;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const usersSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearState: (state) => {
			state.error = '';
			state.status = 'idle';
			state.isNicknameAvailable = false;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('user');
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(checkNickname.pending, (state) => {
				state.status = 'loading';
				state.isNicknameAvailable = false;
			})
			.addCase(checkNickname.fulfilled, (state, action) => {
				state.status = 'success';
				state.isNicknameAvailable = action.payload.user;
			})
			.addCase(checkNickname.rejected, (state) => {
				state.status = 'failure';
				state.isNicknameAvailable = false;
			});
	},
});

export const { clearState } = usersSlice.actions;

export default usersSlice.reducer;
