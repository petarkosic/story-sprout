import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewSentence, Sentence } from '../../../../shared/utils/types';
import { convertToHierarchy } from '../../utils/convertToHierarchy';
import { refreshToken } from '../auth/authSlice';

const initialState = {
	sentences: [] as Sentence[],
	status: 'idle',
	error: '',
};

export const getSentences = createAsyncThunk(
	'stories/getSentences',
	async ({ story_id }: { story_id: number }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/v1/stories/${story_id}`,
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
				return convertToHierarchy(data.sentences);
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const addSentence = createAsyncThunk(
	'sentences/addSentence',
	async (
		{ story_id, sentence_id, content, user_id }: NewSentence,
		{ rejectWithValue, dispatch }
	) => {
		try {
			const response = await fetch('http://localhost:5000/api/v1/stories', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				body: JSON.stringify({ story_id, sentence_id, content, user_id }),
				credentials: 'include',
			});

			const data = await response.json();

			if (response.status === 401) {
				dispatch(refreshToken());

				dispatch(addSentence({ story_id, sentence_id, content, user_id }));
			}

			if (response.ok) {
				dispatch(getSentences({ story_id }));

				return data.newSentence;
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const sentencesSlice = createSlice({
	name: 'sentences',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSentences.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getSentences.fulfilled, (state, action) => {
				state.status = 'success';
				state.sentences = action.payload;
			})
			.addCase(getSentences.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.error.message!;
			})
			.addCase(addSentence.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addSentence.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(addSentence.rejected, (state, action) => {
				state.status = 'failure';
				state.error = action.error.message!;
			});
	},
});

export default sentencesSlice.reducer;
