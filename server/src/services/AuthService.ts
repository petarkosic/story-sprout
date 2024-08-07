import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/db';
import type { Pool, PoolClient } from 'pg';
// @ts-expect-error When running inside docker container, this import works.
import type { User } from '../../shared/utils/types';

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
				'SELECT user_id, first_name, last_name, nickname, email, password FROM users WHERE email = $1';

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
				nickname,
				email: userEmail,
			} = result.rows[0];

			const accessToken = this.generateAccessToken(user_id);
			const refreshToken = this.generateRefreshToken(user_id);

			await dbClient.query('COMMIT');

			return {
				user_id,
				first_name,
				last_name,
				nickname,
				email: userEmail,
				accessToken,
				refreshToken,
				message: 'Login successful',
			};
		} catch (error) {
			await dbClient.query('ROLLBACK');
			throw error;
		}
	}

	async register(dbClient: PoolClient, userObj: User) {
		const { firstName, lastName, email, password } = userObj;
		let { nickname } = userObj;

		if (!nickname) {
			nickname = await this.generateNickname(firstName, lastName);
		}

		while (true) {
			try {
				await dbClient.query('BEGIN');

				const queryNickname = 'SELECT * FROM users WHERE nickname = $1';

				const isUniqueNickname = await dbClient.query(queryNickname, [
					nickname,
				]);

				if (isUniqueNickname.rows.length > 0) {
					nickname = await this.generateNickname(firstName, lastName);
					continue;
				}

				const queryEmail = 'SELECT * FROM users WHERE email = $1';

				const isUniqueEmail = await dbClient.query(queryEmail, [email]);

				if (isUniqueEmail.rows.length > 0) {
					throw new Error('Email already exists');
				}

				const hashedPassword = await bcrypt.hash(password, 10);

				const result = await dbClient.query(
					'INSERT INTO users (first_name, last_name, nickname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, first_name, last_name, nickname, email',
					[firstName, lastName, nickname, email, hashedPassword]
				);

				await dbClient.query('COMMIT');

				return {
					user_id: result.rows[0].user_id,
					message: 'Registration successful',
				};
			} catch (error) {
				await dbClient.query('ROLLBACK');
				throw error;
			}
		}
	}

	async refreshToken(refreshToken: string) {
		try {
			const { id } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
				id: number;
			};

			const newAccessToken = this.generateAccessToken(id);

			return { newAccessToken };
		} catch (error) {
			throw error;
		}
	}

	async generateNickname(firstName: string, lastName: string) {
		const randomNumber = Math.floor(Math.random() * 1000);
		return `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${randomNumber}`;
	}
}

export default new AuthService();
