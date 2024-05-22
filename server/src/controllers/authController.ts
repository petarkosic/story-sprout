import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { type Error } from '../../../shared/utils/types';

export const login = async (req: Request, res: Response) => {
	const dbClient = await AuthService.connect();
	const { email, password } = req.body;

	try {
		const user = await AuthService.login(dbClient, email, password);

		if (user.message === 'Invalid email or password') {
			return res.status(401).json({ message: user.message });
		}

		const {
			accessToken,
			refreshToken,
			user_id,
			email: userEmail,
			first_name,
			last_name,
		} = user;

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		});

		res.status(200).json({
			accessToken,
			user_id,
			email: userEmail,
			first_name,
			last_name,
		});
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};

export const register = async (req: Request, res: Response) => {
	const dbClient = await AuthService.connect();

	try {
		const user = await AuthService.register(dbClient, req.body);

		if (user.message === 'Email already exists') {
			return res.status(401).json({ message: user.message });
		}

		res.status(200).json({ user });
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};

export const logout = async (req: Request, res: Response) => {
	res.clearCookie('refreshToken');
	res.status(200).json({ message: 'Logged out successfully' });
};
