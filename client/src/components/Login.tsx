import { useState } from 'react';

type LoginProps = {
	toggleView: () => void;
};

const Login = ({ toggleView }: LoginProps) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	async function sendData() {
		const response = await fetch('http://localhost:5000/api/v1/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const json = await response.json();
		console.log({ json });
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		sendData();
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
			<button onClick={toggleView}>Not registered yet?</button>
		</div>
	);
};

export default Login;
