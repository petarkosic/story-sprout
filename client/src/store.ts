import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import storiesReducer from './features/stories/storiesSlice';
import sentencesReducer from './features/sentences/sentencesSlice';
import usersReducer from './features/users/usersSlice';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
	reducer: {
		auth: authReducer,
		stories: storiesReducer,
		sentences: sentencesReducer,
		users: usersReducer,
	},
});

export default store;
