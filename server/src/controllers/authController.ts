import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../services/AuthService';
import type { Error } from '../../../shared/utils/types';

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
			nickname,
		} = user;

		res.cookie('refreshToken', refreshToken, {
			maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
			httpOnly: true,
			// secure: true,
			sameSite: 'strict',
		});

		res.status(200).json({
			accessToken,
			user_id,
			email: userEmail,
			first_name,
			last_name,
			nickname,
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

export const refreshToken = async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies;

	if (!refreshToken) {
		return res.status(401).json({ message: 'No refresh token provided' });
	}

	try {
		const { newAccessToken } = await AuthService.refreshToken(refreshToken);

		res.status(200).json({ newAccessToken });
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ message: 'Token expired' });
		} else if (err instanceof jwt.JsonWebTokenError) {
			return res.status(403).json({ message: 'Invalid refresh token' });
		} else {
			return res.status(500).json({ message: 'Internal server error' });
		}
	}
};

export const logout = async (req: Request, res: Response) => {
	res.clearCookie('refreshToken');
	res.status(200).json({ message: 'Logged out successfully' });
};
