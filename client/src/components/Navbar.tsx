import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate('/auth');
	};

	return (
		<>
			<div className='navbar-container'>
				<p onClick={() => navigate('/')}>logo</p>
				<button className='button-login' onClick={handleLogin}>
					login
				</button>
			</div>
		</>
	);
};

export default Navbar;
