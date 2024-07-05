import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import type { Error } from '../../../shared/utils/types';

export const checkNickname = async (req: Request, res: Response) => {
	const dbClient = await UsersService.connect();
	const { nickname } = req.query;

	try {
		const user = await UsersService.checkNickname(dbClient, nickname as string);

		res.status(200).json({ user });
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};

export const changeNickname = async (req: Request, res: Response) => {
	const dbClient = await UsersService.connect();
	const { user_id, nickname } = req.body;

	try {
		const newNickname = await UsersService.changeNickname(
			dbClient,
			nickname,
			user_id
		);

		res.status(200).json({
			newNickname,
			success: true,
			message: 'Nickname changed successfully',
		});
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};
