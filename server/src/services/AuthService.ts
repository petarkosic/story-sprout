import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/db';
import { type Pool, type PoolClient } from 'pg';
import { type User, type Error } from '../../../shared/utils/types';

config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME!;
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME!;

class AuthService {
	private pool: Pool;

	constructor() {
		this.pool = pool;
	}

	async connect() {
		return this.pool.connect();
	}

	generateAccessToken(userID: number) {
		return jwt.sign({ id: userID }, ACCESS_TOKEN_SECRET, {
			expiresIn: ACCESS_TOKEN_LIFETIME,
		});
	}

	generateRefreshToken(userID: number) {
		return jwt.sign({ id: userID }, REFRESH_TOKEN_SECRET, {
			expiresIn: REFRESH_TOKEN_LIFETIME,
		});
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
				email: userEmail,
			} = result.rows[0];

			const accessToken = this.generateAccessToken(user_id);
			const refreshToken = this.generateRefreshToken(user_id);

			await dbClient.query('COMMIT');

			return {
				user_id,
				first_name,
				last_name,
				email: userEmail,
				accessToken,
				refreshToken,
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
		const { firstName, lastName, email, password } = userObj;

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

			await dbClient.query('COMMIT');

			return {
				user_id: result.rows[0].user_id,
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
