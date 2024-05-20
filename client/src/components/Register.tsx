import { useState } from 'react';

type RegisterProps = {
	toggleView: () => void;
};

const Register = ({ toggleView }: RegisterProps) => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	async function sendData() {
		const data = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
		};

		const response = await fetch('http://localhost:5000/api/v1/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
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
			<button onClick={toggleView}>Already have an account?</button>
		</div>
	);
};

export default Register;
