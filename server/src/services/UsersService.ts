import pool from '../db/db';
import type { Pool, PoolClient } from 'pg';

class UsersService {
	private pool: Pool;

	constructor() {
		this.pool = pool;
	}

	async connect() {
		return this.pool.connect();
	}

	async checkNickname(dbClient: PoolClient, nickname: string) {
		try {
			await dbClient.query('BEGIN');

			const query = 'SELECT * FROM users WHERE nickname = $1';

			const result = await dbClient.query(query, [nickname]);

			await dbClient.query('COMMIT');

			return result.rows.length > 0;
		} catch (error) {
			await dbClient.query('ROLLBACK');
			throw error;
		}
	}

	async changeNickname(
		dbClient: PoolClient,
		nickname: string,
		user_id: string
	) {
		try {
			await dbClient.query('BEGIN');

			const query =
				'UPDATE users SET nickname = $1 WHERE user_id = $2 RETURNING nickname';

			const newNickname = await dbClient.query(query, [nickname, user_id]);

			await dbClient.query('COMMIT');

			return newNickname.rows[0].nickname;
		} catch (error) {
			await dbClient.query('ROLLBACK');
			throw error;
		}
	}

	async getUsersStories(dbClient: PoolClient, user_id: string) {
		try {
			await dbClient.query('BEGIN');

			const query = 'SELECT * FROM stories WHERE user_id = $1';

			const result = await dbClient.query(query, [user_id]);

			await dbClient.query('COMMIT');

			return result.rows;
		} catch (error) {
			await dbClient.query('ROLLBACK');
			throw error;
		}
	}

	async getUsersSentences(dbClient: PoolClient, user_id: string) {
		try {
			await dbClient.query('BEGIN');

			const query = `
				SELECT
					s.sentence_id, 
					s.story_id,
					s.parent_sentence_id, 
					s.content,
					s.created_at,
					st.story_headline,
					st.user_id
				FROM sentences s 
				LEFT JOIN stories st 
				ON s.story_id = st.story_id 
				WHERE st.user_id = $1
				ORDER BY s.created_at DESC;
				`;
			const result = await dbClient.query(query, [user_id]);

			await dbClient.query('COMMIT');

			return result.rows;
		} catch (error) {
			await dbClient.query('ROLLBACK');
			throw error;
		}
	}

	async getUsersRated(dbClient: PoolClient, user_id: string) {
		try {
			await dbClient.query('BEGIN');

			const query = `
				SELECT 
					s.story_id,
					s.story_headline,
					r.rating
				FROM stories s
				JOIN ratings r ON s.story_id = r.story_id
				WHERE r.user_id = $1;
			`;

			const result = await dbClient.query(query, [user_id]);

			await dbClient.query('COMMIT');

			return result.rows;
		} catch (error) {
			await dbClient.query('ROLLBACK');
			throw error;
		}
	}
}

export default new UsersService();
