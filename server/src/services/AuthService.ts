import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import pool from '../db/db';
import { type Pool, type PoolClient } from 'pg';
import { type User, type Error } from '../../../shared/utils/types';

config();

class AuthService {
	private pool: Pool;

	constructor() {
		this.pool = pool;
	}

	async connect() {
		return this.pool.connect();
	}

	async login(dbClient: PoolClient, email: string, password: string) {
		try {
			await dbClient.query('BEGIN');

			const query =
				'SELECT user_id, first_name, last_name, email, password FROM users WHERE email = $1';

			const result = await dbClient.query(query, [email]);

			if (result.rows.length === 0) {
				throw new Error('Invalid email or password');
			}

			const isValidPassword = await bcrypt.compare(
				password,
				result.rows[0].password
			);

			if (!isValidPassword) {
				throw new Error('Invalid email or password');
			}

			const {
				user_id,
				first_name,
				last_name,
				email: user_email,
			} = result.rows[0];

			await dbClient.query('COMMIT');

			return {
				user_id,
				first_name,
				last_name,
				email: user_email,
				message: 'Login successful',
			};
		} catch (err) {
			await dbClient.query('ROLLBACK');
			const error = err as Error;
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	async register(dbClient: PoolClient, userObj: User) {
		const {
			first_name: firstName,
			last_name: lastName,
			email,
			password,
		} = userObj;

		try {
			await dbClient.query('BEGIN');

			const query = 'SELECT * FROM users WHERE email = $1';

			const isUnique = await dbClient.query(query, [email]);

			if (isUnique.rows.length > 0) {
				throw new Error('Email already exists');
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const result = await dbClient.query(
				'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, first_name, last_name, email',
				[firstName, lastName, email, hashedPassword]
			);

			const {
				user_id,
				first_name,
				last_name,
				email: user_email,
			} = result.rows[0];

			await dbClient.query('COMMIT');

			return {
				user_id,
				first_name,
				last_name,
				email: user_email,
				message: 'Registration successful',
			};
		} catch (err) {
			await dbClient.query('ROLLBACK');
			const error = err as Error;
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}

export default new AuthService();
