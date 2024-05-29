import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearState, logoutUser } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../store';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);

	const handleLogin = () => {
		navigate('/auth');
	};

	const handleLoguot = () => {
		dispatch(clearState());
		dispatch(logoutUser());
		navigate('/auth');
	};

	return (
		<>
			<div className='navbar-container'>
				<p onClick={() => navigate('/')}>logo</p>
				{user?.first_name ? (
					<>
						<div>
							{user?.first_name} {user?.last_name[0] + '.'}
							<p></p>
						</div>
						<button className='button-logout' onClick={handleLoguot}>
							logout
						</button>
					</>
				) : (
					<button className='button-login' onClick={handleLogin}>
						login
					</button>
				)}
			</div>
		</>
	);
};

export default Navbar;
