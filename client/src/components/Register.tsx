import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';

type RegisterProps = {
	toggleView: () => void;
};

const Register = ({ toggleView }: RegisterProps) => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.auth);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(registerUser({ firstName, lastName, email, password }));

		if (status === 'success') {
			toggleView();
		}
	};

	return (
		<div className='auth-container'>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>First Name:</label>
					<input
						type='text'
						name='first_name'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div>
					<label>Last Name:</label>
					<input
						type='text'
						name='last_name'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
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
				<button type='submit'>Register</button>
			</form>
			{status === 'loading' && <p>Loading...</p>}
			{error && <p>{error}</p>}
			<button onClick={toggleView}>Already have an account?</button>
		</div>
	);
};

export default Register;
