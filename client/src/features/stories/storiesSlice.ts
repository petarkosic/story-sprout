import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	stories: [],
	status: 'idle',
	error: '',
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

const storiesSlice = createSlice({
	name: 'stories',
	initialState,
	reducers: {},
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
			});
	},
});

export default storiesSlice.reducer;
