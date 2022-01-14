import db from '../database';
import { OrderInterface } from '../interfaces/order';

export class OrderStore {
    async index(): Promise<OrderInterface[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not index orders: ${err}`);
        }
    }

    async show(id: number): Promise<OrderInterface> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not show order: ${err}`);
        }
    }

    async create(order: OrderInterface) {
        try {
            const { status, user_id } = order;
            const conn = await db.connect();
            const sql =
                'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [status, user_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create user ${err}`);
        }
    }

    async destroy(id: number): Promise<OrderInterface> {
        try {
            const conn = await db.connect();
            const sql = `DELETE FROM orders WHERE id = $1 RETURNING *`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete order: ${err}`);
        }
    }

    async addProduct(
        quantity: number,
        orderId: number,
        productId: number
    ): Promise<OrderInterface> {
        // get order to see if it is open
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [orderId]);
            const order = result.rows[0];

            if (order.status !== 'open') {
                throw new Error(
                    `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
                );
            }

            conn.release();
        } catch (err) {
            throw new Error(`${err}`);
        }

        try {
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

            const conn = await db.connect();

            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(
                `Could not add product ${productId} to order ${orderId}: ${err}`
            );
        }
    }
}
