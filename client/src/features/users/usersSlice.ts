import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	newNickname: '',
	status: 'idle',
	error: '',
	isNicknameAvailable: false,
	stories: [],
	sentences: [],
	rated: [],
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

export const changeNickname = createAsyncThunk(
	'auth/changeNickname',
	async (
		{ user_id, nickname }: { user_id: string; nickname: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/v1/users/change-nickname',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
					credentials: 'include',
					body: JSON.stringify({ user_id, nickname }),
				}
			);

			const data = await response.json();

			if (response.ok) {
				const storedUser = JSON.parse(localStorage.getItem('user')!);
				storedUser.nickname = nickname;
				localStorage.setItem('user', JSON.stringify(storedUser));

				return data;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getUsersStories = createAsyncThunk(
	'users/getUsersStories',
	async (user_id: string, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/v1/users/${user_id}/stories`,
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
				return data.stories;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getUsersSentences = createAsyncThunk(
	'users/getUsersSentences',
	async (user_id: string, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/v1/users/${user_id}/sentences`,
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
				return data.sentences;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getUsersRated = createAsyncThunk(
	'users/getUsersRated',
	async (user_id: string, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/v1/users/${user_id}/rated`,
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
				return data.rated;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		clearState: (state) => {
			state.newNickname = '';
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
			})
			.addCase(changeNickname.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(changeNickname.fulfilled, (state, action) => {
				state.status = 'success';
				state.newNickname = action.payload.newNickname;
			})
			.addCase(changeNickname.rejected, (state) => {
				state.status = 'failure';
			})
			.addCase(getUsersStories.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUsersStories.fulfilled, (state, action) => {
				state.status = 'success';
				state.stories = action.payload;
			})
			.addCase(getUsersStories.rejected, (state) => {
				state.status = 'failure';
			})
			.addCase(getUsersSentences.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUsersSentences.fulfilled, (state, action) => {
				state.status = 'success';
				state.sentences = action.payload;
			})
			.addCase(getUsersSentences.rejected, (state) => {
				state.status = 'failure';
			})
			.addCase(getUsersRated.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUsersRated.fulfilled, (state, action) => {
				state.status = 'success';
				state.rated = action.payload;
			})
			.addCase(getUsersRated.rejected, (state) => {
				state.status = 'failure';
			});
	},
});

export const { clearState } = usersSlice.actions;

export default usersSlice.reducer;
