import db from '../database';
import { ProductInterface, Category } from '../interfaces/product';

export class ProductStore {
    table = 'products';

    async index(): Promise<ProductInterface[]> {
        try {
            const conn = await db.connect();
            const cols =
                'products.id, name, price, description, image, categories.category';
            const sql = `SELECT ${cols} FROM ${this.table} INNER JOIN categories ON products.cat_id = categories.id`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not index products: ${err}`);
        }
    }

    async show(id: number): Promise<ProductInterface> {
        try {
            const conn = await db.connect();
            const cols =
                'products.id, name, price, description, image, categories.category';
            const sql = `SELECT ${cols} FROM ${this.table} INNER JOIN categories ON products.cat_id = categories.id WHERE products.id = $1`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not show product: ${err}`);
        }
    }

    async create(product: ProductInterface): Promise<ProductInterface> {
        try {
            const conn = await db.connect();
            const { name, price, description, image, category } = product;
            const sql = `INSERT INTO ${this.table} (name, price, description, image, cat_id) VALUES($1, $2, $3, $4, $5) RETURNING *`;
            const result = await conn.query(sql, [
                name,
                price,
                description,
                image,
                category,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Problem with create product ${err}`);
        }
    }

    async destroy(id: number): Promise<ProductInterface> {
        try {
            const conn = await db.connect();
            const sql = `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete product: ${err}`);
        }
    }

    async getProductCategories(): Promise<Category[]> {
        try {
            const conn = await db.connect();
            const sql = `SELECT DISTINCT category FROM ${this.table} INNER JOIN categories ON products.cat_id = categories.id ORDER BY category ASC`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get categories ${err}`);
        }
    }
}
