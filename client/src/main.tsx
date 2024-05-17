import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import HomeView from './views/HomeView.tsx';
import StoryView from './views/StoryView.tsx';
import Navbar from './components/Navbar.tsx';
import NotFound from './views/NotFound.tsx';
import AuthView from './views/AuthView.tsx';

const Root = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <HomeView />,
			},
			{
				path: '/story/:id',
				element: <StoryView />,
			},
			{
				path: '/auth',
				element: <AuthView />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
