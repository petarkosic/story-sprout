import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from './views/HomeView.tsx';
import StoryView from './views/StoryView.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeView />,
	},
	{
		path: '/story/:id',
		element: <StoryView />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
