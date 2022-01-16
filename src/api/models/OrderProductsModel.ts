import db from '../database';
import { OrderProducts } from '../interfaces/order';

export class OrderProductsStore {
    table = 'order_products';
    async index(): Promise<OrderProducts[]> {
        try {
            const conn = await db.connect();
            const sql = `SELECT * FROM ${this.table} INNER JOIN products ON ${this.table}.product_id = products.id`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not index order_products: ${err}`);
        }
    }

    async show(orderId: number): Promise<OrderProducts[]> {
        try {
            const conn = await db.connect();
            const cols =
                'order_id, product_id, quantity, products.name, products.price, products.description, products.image, products.cat_id';
            const sql = `SELECT ${cols} FROM ${this.table} INNER JOIN products on ${this.table}.product_id = products.id WHERE order_id = $1`;
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not show products on Order ID ${orderId}: ${err}`
            );
        }
    }

    async create(
        quantity: number,
        orderId: number,
        productId: number
    ): Promise<OrderProducts> {
        try {
            const productsInOrder = await this.show(orderId);
            const productAlreadyExists: OrderProducts | undefined =
                productsInOrder.find(
                    (product) => product.product_id === productId
                );
            if (productAlreadyExists !== undefined) {
                // const editedOrder = await this.edit(
                //     quantity,
                //     productId,
                //     orderId
                // );
                // return editedOrder;
                throw new Error(
                    `Could not add product. Product already exists on order`
                );
            }
        } catch (err) {
            throw new Error(`Could not add product to order: ${err}`);
        }
        try {
            const conn = await db.connect();
            const sql = `INSERT INTO ${this.table} (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`;

            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);

            const productAdded = result.rows[0];

            conn.release();

            return productAdded;
        } catch (err) {
            throw new Error(`Could not add product to order: ${err}`);
        }
    }

    async edit(
        quantity: number,
        productId: number,
        orderId: number
    ): Promise<OrderProducts> {
        try {
            const productsInOrder = await this.show(orderId);
            const productInOrder: OrderProducts | undefined =
                productsInOrder.find(
                    (product) => product.product_id === productId
                );
            if (productInOrder === undefined) {
                // const editedOrder = await this.edit(
                //     quantity,
                //     productId,
                //     orderId
                // );
                // return editedOrder;
                throw new Error(`Product does not exist on order`);
            }
        } catch (err) {
            throw new Error(`Could not edit product: ${err}`);
        }
        try {
            const conn = await db.connect();
            const sql = `UPDATE ${this.table} SET quantity = $1 WHERE order_id=$2 AND product_id=$3 RETURNING *;`;

            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);

            const productEdited = result.rows[0];

            conn.release();

            return productEdited;
        } catch (err) {
            throw new Error(`Could not edit product: ${err}`);
        }
    }

    async destroy(productId: number, orderId: number): Promise<OrderProducts> {
        try {
            const conn = await db.connect();
            const sql = `DELETE FROM ${this.table} WHERE product_id = $1 AND order_id = $2 RETURNING *`;
            const result = await conn.query(sql, [productId, orderId]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete order: ${err}`);
        }
    }
}
