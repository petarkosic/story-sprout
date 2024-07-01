import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';

type LoginProps = {
	toggleView: () => void;
};

const Login = ({ toggleView }: LoginProps) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();
	const { state } = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const { status, error } = useSelector((state: RootState) => state.auth);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(loginUser({ email, password }));

		navigate('/');
	};

	return (
		<div className='auth-container'>
			{state?.error}
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						required
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						required
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
