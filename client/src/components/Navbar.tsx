import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const handleLogin = () => {
		navigate('/auth');
	};

	const handleLoguot = () => {
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
