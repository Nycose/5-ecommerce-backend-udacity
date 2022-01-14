import db from '../database';
import { UserInterface } from '../interfaces/user';
import bcrypt from 'bcrypt';

export class UserStore {
    table = 'users';

    async index(): Promise<UserInterface[]> {
        try {
            const conn = await db.connect();
            const sql = `SELECT * FROM ${this.table}`;
            const result = await db.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not index users: ${err}`);
        }
    }

    async show(id: number): Promise<UserInterface> {
        try {
            const conn = await db.connect();
            const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
            const result = await db.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not show user ${err}`);
        }
    }

    async create(
        first_name: string,
        last_name: string,
        username: string,
        password: string,
        isAdmin: boolean
    ): Promise<UserInterface> {
        try {
            const conn = await db.connect();
            const cols = 'first_name, last_name, username, password, is_admin';
            const sql = `INSERT INTO users (${cols}) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const hash = bcrypt.hashSync(
                password + process.env.BCRYPT_PASSWORD,
                parseInt(process.env.SALT_ROUNDS as string)
            );
            const result = await db.query(sql, [
                first_name,
                last_name,
                username,
                hash,
                isAdmin,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create user: ${err}`);
        }
    }

    async authenticate(
        username: string,
        password: string
    ): Promise<UserInterface | null> {
        const conn = await db.connect();
        const sql = 'SELECT password FROM users WHERE username=($1)';

        const result = await conn.query(sql, [username]);

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (result.rows.length) {
            const user = result.rows[0];

            if (
                bcrypt.compareSync(
                    password + process.env.BCRYPT_PASSWORD,
                    user.password
                )
            ) {
                return user;
            }
        }

        throw new Error('Unable to authenticate');
    }
}
