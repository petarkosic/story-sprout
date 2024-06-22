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
		res.status(500).json({ success: false, message: error.message });
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
		res.status(500).json({ success: false, message: error.message });
	} finally {
		dbClient.release();
	}
};

export const addSentence = async (req: Request, res: Response) => {
	const dbClient = await StoryService.connect();

	const { story_id, sentence_id, content, user_id } = req.body;

	try {
		const sentence = {
			story_id,
			sentence_id,
			content,
			user_id,
		};

		await StoryService.addSentence(dbClient, sentence);

		res.status(200).json({
			success: true,
			message: 'New sentence added successfully',
		});
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message });
	} finally {
		dbClient.release();
	}
};

export const addNewStory = async (req: Request, res: Response) => {
	const dbClient = await StoryService.connect();

	const { story_headline, user_id } = req.body;

	try {
		await StoryService.addNewStory(dbClient, story_headline, user_id);

		res.status(200).json({
			success: true,
			message: 'Story added successfully',
		});
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message });
	} finally {
		dbClient.release();
	}
};

export const rateStory = async (req: Request, res: Response) => {
	const dbClient = await StoryService.connect();

	const { story_id, user_id, rating } = req.body;

	try {
		await StoryService.rateStory(dbClient, story_id, user_id, rating);

		res.status(200).json({
			success: true,
			message: 'Rating added successfully',
		});
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message });
	} finally {
		dbClient.release();
	}
};

export const checkIfUserRatedStory = async (req: Request, res: Response) => {
	const dbClient = await StoryService.connect();
	const { story_id, user_id } = req.body;

	try {
		const result = await StoryService.checkIfUserRatedStory(
			dbClient,
			story_id,
			user_id
		);

		res.status(200).json({
			rated: !!result,
			message: result
				? 'User already rated this story'
				: 'User has not rated this story',
		});
	} catch (err) {
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message });
	} finally {
		dbClient.release();
	}
};
