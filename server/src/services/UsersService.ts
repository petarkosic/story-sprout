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
}

export default new UsersService();
