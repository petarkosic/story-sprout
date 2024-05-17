type RegisterProps = {
	toggleView: () => void;
};

// TODO: fix input[type='text'] styling for first name and last name

const Register = ({ toggleView }: RegisterProps) => {
	return (
		<div className='auth-container'>
			<h2>Register</h2>
			<form>
				<div>
					<label>First Name:</label>
					<input type='text' name='first_name' />
				</div>
				<div>
					<label>Last Name:</label>
					<input type='text' name='last_name' />
				</div>
				<div>
					<label>Email:</label>
					<input type='email' name='email' />
				</div>
				<div>
					<label>Password:</label>
					<input type='password' name='password' />
				</div>
				<button type='submit'>Register</button>
			</form>
			<button onClick={toggleView}>Already have an account?</button>
		</div>
	);
};

export default Register;
