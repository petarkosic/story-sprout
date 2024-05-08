import { Request, Response } from 'express';
import StoryService from '../services/StoryService';

type Error = {
	message: string;
};

export const getStories = async (req: Request, res: Response) => {
	const dbClient = await StoryService.connect();

	try {
		const stories = await StoryService.getStories(dbClient);

		res.status(200).json({
			stories,
		});
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};

export const getSentences = async (req: Request, res: Response) => {
	const dbClient = await StoryService.connect();
	const { id } = req.params;

	try {
		const sentences = await StoryService.getSentences(dbClient, id);

		res.status(200).json({
			sentences,
		});
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: error.message });
	} finally {
		dbClient.release();
	}
};
