import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../store';
import { useDebounce } from '../hooks/useDebounce';
import { checkNickname } from '../features/users/usersSlice';

type RegisterProps = {
	toggleView: () => void;
};

const Register = ({ toggleView }: RegisterProps) => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [nickname, setNickname] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const { status, error, isNicknameAvailable } = useSelector(
		(state: RootState) => state.users
	);

	const debouncedNickname = useDebounce<string>(nickname, 1000);

	useEffect(() => {
		if (nickname) {
			dispatch(checkNickname(nickname));
		}
	}, [debouncedNickname]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(registerUser({ firstName, lastName, nickname, email, password }));

		if (status === 'success') {
			toggleView();
		}
	};

	return (
		<div className='auth-container'>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='first_name'>First Name:</label>
					<input
						type='text'
						id='first_name'
						name='first_name'
						required
						autoFocus
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='last_name'>Last Name:</label>
					<input
						type='text'
						id='last_name'
						name='last_name'
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='nickname'>
						Nickname:
						<span className='tooltip'>
							&#9432;
							<div className='tooltip-text'>
								- If not provided, it will be generated automatically.
								<br />- Can be changed later.
							</div>
						</span>
					</label>

					<input
						type='text'
						id='nickname'
						name='nickname'
						className={isNicknameAvailable ? 'unavailable' : 'available'}
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>

					{isNicknameAvailable ? (
						<span className='check-if-available'>&#x2715;</span>
					) : (
						<span className='check-if-available'>&#x2713;</span>
					)}
				</div>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						required
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
				<button disabled={isNicknameAvailable} type='submit'>
					Register
				</button>
			</form>
			{status === 'loading' && <p>Loading...</p>}
			{error && <p>{error}</p>}
			<button onClick={toggleView}>Already have an account?</button>
		</div>
	);
};

export default Register;
