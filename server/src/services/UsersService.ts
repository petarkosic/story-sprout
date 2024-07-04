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
}

export default new UsersService();
