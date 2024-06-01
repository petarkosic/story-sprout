import { Outlet, createBrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomeView from '../views/HomeView';
import StoryView from '../views/StoryView';
import AuthView from '../views/AuthView';
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<Navbar />
				<Outlet />
			</>
		),
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

export default router;
