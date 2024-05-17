import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const AuthView = () => {
	const [isLogin, setIsLogin] = useState(true);

	const toggleView = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div>
			{isLogin ? (
				<Login toggleView={toggleView} />
			) : (
				<Register toggleView={toggleView} />
			)}
		</div>
	);
};

export default AuthView;
