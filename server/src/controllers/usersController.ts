import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
// @ts-expect-error When running inside docker container, this import works.
import type { Error } from '../../shared/utils/types';

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

export const getUsersStories = async (req: Request, res: Response) => {
	const dbClient = await UsersService.connect();
	const { user_id } = req.params;

	try {
		const stories = await UsersService.getUsersStories(dbClient, user_id);

		res.status(200).json({ stories });
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};

export const getUsersSentences = async (req: Request, res: Response) => {
	const dbClient = await UsersService.connect();
	const { user_id } = req.params;

	try {
		const sentences = await UsersService.getUsersSentences(dbClient, user_id);

		res.status(200).json({ sentences });
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};

export const getUsersRated = async (req: Request, res: Response) => {
	const dbClient = await UsersService.connect();
	const { user_id } = req.params;

	try {
		const rated = await UsersService.getUsersRated(dbClient, user_id);

		res.status(200).json({ rated });
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};
