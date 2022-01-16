import db from '../database';
import { OrderInterface, OrderProducts } from '../interfaces/order';
import { OrderProductsStore } from './OrderProductsModel';
import { isValidStatus } from '../utils/order-validation';

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

    async create(order: OrderInterface): Promise<OrderInterface> {
        try {
            const { status, user_id } = order;
            isValidStatus(status);
            const conn = await db.connect();
            const sql =
                'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [status, user_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create order ${err}`);
        }
    }

    async edit(orderId: number, status: string): Promise<OrderInterface> {
        try {
            isValidStatus(status);
            const conn = await db.connect();
            const sql = `UPDATE orders SET status = $1 WHERE id=${orderId} RETURNING *;`;
            const result = await conn.query(sql, [status]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not edit order: ${err}`);
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
    ): Promise<OrderProducts> {
        // get order to see if it is open
        try {
            const order = await this.show(orderId);

            if (order.status !== 'open') {
                throw new Error(
                    `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
                );
            }
        } catch (err) {
            throw new Error(`${err}`);
        }

        try {
            const orderProducts = new OrderProductsStore();
            const productAdded = await orderProducts.create(
                quantity,
                orderId,
                productId
            );

            return productAdded;
        } catch (err) {
            throw new Error(
                `Could not add product ${productId} to order ${orderId}: ${err}`
            );
        }
    }
}
