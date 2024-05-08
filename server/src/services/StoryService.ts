import { config } from 'dotenv';
import pool from '../db/db';
import { type Pool, PoolClient } from 'pg';

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
}

export default new StoryService();
