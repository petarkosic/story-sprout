import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
	toggleView: () => void;
};

const Login = ({ toggleView }: LoginProps) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.auth);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(loginUser({ email, password }));
		navigate('/');
	};

	return (
		<div className='auth-container'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
			{status === 'loading' && <p>Loading...</p>}
			{error && <p>{error}</p>}
			<button onClick={toggleView}>Not registered yet?</button>
		</div>
	);
};

export default Login;
