import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export default function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			message: 'Access Denied!',
		});
	}

	try {
		const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);

		if (!verified) {
			return res.status(401).json({
				message: 'Invalid Token!',
			});
		}

		req.user = verified;

		next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				message: 'Token expired',
			});
		} else if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({
				message: 'Invalid Token!',
			});
		} else {
			return res.status(500).json({
				message: 'Server Error',
			});
		}
	}
}
