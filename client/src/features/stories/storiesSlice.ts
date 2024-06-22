import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { refreshToken } from '../auth/authSlice';

const initialState = {
	stories: [],
	status: 'idle',
	error: '',
	hasAlreadyRated: false,
};

export const getStories = createAsyncThunk(
	'stories/getStories',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:5000/api/v1/stories', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

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

export const addNewStory = createAsyncThunk(
	'stories/addNewStory',
	async (
		{ story_headline, user_id }: { story_headline: string; user_id: string },
		{ rejectWithValue, dispatch }
	) => {
		let tokenRefreshed = false;
		try {
			const response = await fetch('http://localhost:5000/api/v1/stories/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				body: JSON.stringify({ story_headline, user_id }),
				credentials: 'include',
			});

			const data = await response.json();

			if (response.status === 401 && !tokenRefreshed) {
				tokenRefreshed = true;

				await dispatch(refreshToken()).unwrap();

				return dispatch(addNewStory({ story_headline, user_id })).unwrap();
			}

			if (response.ok) {
				dispatch(getStories());

				return data.newStory;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const rateStory = createAsyncThunk(
	'stories/rateStory',
	async (
		{
			story_id,
			user_id,
			rating,
		}: { story_id: string; user_id: string; rating: number },
		{ rejectWithValue, dispatch }
	) => {
		let tokenRefreshed = false;

		try {
			const response = await fetch(
				'http://localhost:5000/api/v1/stories/ratings',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
					body: JSON.stringify({ story_id, user_id, rating }),
					credentials: 'include',
				}
			);

			const data = await response.json();

			if (response.status === 401 && !tokenRefreshed) {
				tokenRefreshed = true;

				await dispatch(refreshToken()).unwrap();

				return dispatch(rateStory({ story_id, user_id, rating })).unwrap();
			}

			if (response.ok) {
				return data.story;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const checkIfUserRatedStory = createAsyncThunk(
	'stories/checkIfUserRatedStory',
	async (
		{ story_id, user_id }: { story_id: string; user_id: string },
		{ rejectWithValue, dispatch }
	) => {
		let tokenRefreshed = false;

		try {
			const response = await fetch(
				'http://localhost:5000/api/v1/stories/ratings/rated',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
					body: JSON.stringify({ story_id, user_id }),
					credentials: 'include',
				}
			);

			const data = await response.json();

			if (response.status === 401 && !tokenRefreshed) {
				tokenRefreshed = true;

				await dispatch(refreshToken()).unwrap();

				return dispatch(checkIfUserRatedStory({ story_id, user_id })).unwrap();
			}

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

const storiesSlice = createSlice({
	name: 'stories',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStories.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getStories.fulfilled, (state, action) => {
				state.status = 'success';
				state.stories = action.payload;
			})
			.addCase(getStories.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.error.message!;
			})
			.addCase(addNewStory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addNewStory.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(addNewStory.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.error.message!;
			})
			.addCase(rateStory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(rateStory.fulfilled, (state, action) => {
				state.status = 'success';
				state.stories = action.payload;
			})
			.addCase(rateStory.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.payload as string;
			})
			.addCase(checkIfUserRatedStory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(checkIfUserRatedStory.fulfilled, (state, action) => {
				state.status = 'success';
				state.hasAlreadyRated = action.payload.rated;
			})
			.addCase(checkIfUserRatedStory.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.error.message!;
			});
	},
});

export const { clearError } = storiesSlice.actions;

export default storiesSlice.reducer;
