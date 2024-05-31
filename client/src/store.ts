import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import storiesReducer from './features/stories/storiesSlice';
import sentencesReducer from './features/sentences/sentencesSlice';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
	reducer: {
		auth: authReducer,
		stories: storiesReducer,
		sentences: sentencesReducer,
	},
});

export default store;
