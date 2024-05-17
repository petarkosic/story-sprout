type LoginProps = {
	toggleView: () => void;
};

const Login = ({ toggleView }: LoginProps) => {
	return (
		<div className='auth-container'>
			<h2>Login</h2>
			<form>
				<div>
					<label>Email:</label>
					<input type='email' name='email' />
				</div>
				<div>
					<label>Password:</label>
					<input type='password' name='password' />
				</div>
				<button type='submit'>Login</button>
			</form>
			<button onClick={toggleView}>Not registered yet?</button>
		</div>
	);
};

export default Login;
