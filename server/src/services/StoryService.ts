import { config } from 'dotenv';
import pool from '../db/db';
import type { Pool, PoolClient } from 'pg';
import type { NewSentence } from '../../../shared/utils/types';

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
				`SELECT
					s.sentence_id,
					s.story_id,
					s.parent_sentence_id,
					s.content,
					s.created_at,
					st.story_headline,
					st.rating,
					u.user_id,
					u.first_name,
					u.last_name,
					u.email,
					u.registered_at
				FROM sentences s
				LEFT JOIN stories st
				ON st.story_id = s.story_id
				LEFT JOIN users u
				ON u.user_id = s.user_id
				WHERE s.story_id = $1`,
				[id]
			);

			dbClient.query('COMMIT');

			return result.rows;
		} catch (error) {
			dbClient.query('ROLLBACK');
			throw new Error('Server error');
		}
	}

	async addSentence(dbClient: PoolClient, sentence: NewSentence) {
		const { story_id, sentence_id, content, user_id } = sentence;

		try {
			dbClient.query('BEGIN');

			const result = await dbClient.query(
				'INSERT INTO sentences (story_id, parent_sentence_id, content, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
				[story_id, sentence_id, content, user_id]
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
