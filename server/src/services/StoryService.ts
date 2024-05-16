import { config } from 'dotenv';
import pool from '../db/db';
import { type Pool, type PoolClient } from 'pg';
import { type Sentence } from '../../../shared/utils/types';

config();

class StoryService {
	private pool: Pool;

	constructor() {
		this.pool = pool;
	}

	async connect() {
		return this.pool.connect();
	}

	async getStories(dbClient: PoolClient) {
		try {
			dbClient.query('BEGIN');

			const result = await dbClient.query('SELECT * FROM stories');

			dbClient.query('COMMIT');

			return result.rows;
		} catch (error) {
			dbClient.query('ROLLBACK');
			throw new Error('Server error');
		}
	}

	async getSentences(dbClient: PoolClient, id: string) {
		try {
			dbClient.query('BEGIN');

			const result = await dbClient.query(
				'SELECT * FROM sentences WHERE story_id = $1',
				[id]
			);

			dbClient.query('COMMIT');

			return result.rows;
		} catch (error) {
			dbClient.query('ROLLBACK');
			throw new Error('Server error');
		}
	}

	async addSentence(
		dbClient: PoolClient,
		sentence: Pick<Sentence, 'story_id' | 'sentence_id' | 'content'>
	) {
		const { story_id, sentence_id, content } = sentence;

		try {
			dbClient.query('BEGIN');

			const result = await dbClient.query(
				'INSERT INTO sentences (story_id, parent_sentence_id, content) VALUES ($1, $2, $3) RETURNING *',
				[story_id, sentence_id, content]
			);

			dbClient.query('COMMIT');

			return result.rows[0];
		} catch (error) {
			dbClient.query('ROLLBACK');
			throw new Error('Server error');
		}
	}
}

export default new StoryService();
