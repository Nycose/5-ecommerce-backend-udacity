import { isError } from '../utils/type-guards';
import { Router, Request, Response } from 'express';
import { OrderStore } from '../models/OrderModel';
import { OrderProductsStore } from '../models/OrderProductsModel';

/*
 *   This file mostly contains function expressions that are HTTP request/response handlers
 *   for requests sent to the root URL '/orders'
 *   The sole function of each handler is to unpack the request and send a response to the client.
 *   Handlers delegate database operations to models that are described below
 *
 */

/*
 *   A model that represents the 'orders' table as an object
 *   Performs CRUD operations on 'orders' table
 *   The 'orders' table represents a one to many relationship between the 'users' table and the 'orders' table
 *   The 'orders' table shows the status and user ID for each order
 */
const orderStore = new OrderStore();

/*
 *   A model that represents the 'order_products' table as an object
 *   Performs CRUD operations on 'order_products' table
 *   The 'order_products' table represents a many to many relationship between the tables 'products' and 'orders'
 *   The 'order_products' table shows all of the products and their quantity for each order
 */
const orderProductsStore = new OrderProductsStore();

// Returns all orders
const index = async (_req: Request, res: Response) => {
    try {
        const result = await orderStore.index();
        return res.json(result);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

// Returns an order by a given order ID provided in the request parameters
const show = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id);
        const result = await orderStore.show(orderId);
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

// Creates an order and returns the created order
const create = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.create(req.body);
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

// Edits an order by a given order ID provided in the request parameters
// Returns edited order
const edit = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const result = await orderStore.edit(orderId, req.body.status);
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

// Deletes an order by a given order ID provided in the request parameters
const destroy = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const deleted = await orderStore.destroy(orderId);
        return res.send(deleted);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

// Adds a product to an order
const addProduct = async (req: Request, res: Response) => {
    const orderId: number = parseInt(req.params.id, 10);
    const productId: number = parseInt(req.body.product_id, 10);
    const quantity: number = parseInt(req.body.quantity, 10);

    try {
        const addedProduct = await orderStore.addProduct(
            quantity,
            orderId,
            productId
        );
        return res.json(addedProduct);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

// Returns all of the products on each order
const getOrderProducts = async (req: Request, res: Response) => {
    try {
        const result = await orderProductsStore.index();
        return res.json(result);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

// Returns all of the products that belong to a specific order
const getProductsByOrderId = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const result = await orderProductsStore.show(orderId);
        return res.json(result);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

// Edits a product on an order
const editProduct = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.orderId, 10);
        const productId = parseInt(req.params.productId, 10);
        const { quantity } = req.body;
        const result = await orderProductsStore.edit(
            quantity,
            productId,
            orderId
        );
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

// Deletes a product from an order
const destroyProduct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.productId, 10);
        const orderId = parseInt(req.params.orderId, 10);
        const result = await orderProductsStore.destroy(productId, orderId);
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

/*
 *   Express router object that bundles the
 *   handlers/middleware for the root /orders route
 */
export const OrderController = Router();

OrderController.get('/products', getOrderProducts);
OrderController.get('/:id/products', getProductsByOrderId);
OrderController.post('/:id/products', addProduct);
OrderController.put('/:orderId/products/:productId', editProduct);
OrderController.delete('/:orderId/products/:productId', destroyProduct);

OrderController.get('/', index);
OrderController.get('/:id', show);
OrderController.post('/', create);
OrderController.put('/:id', edit);
OrderController.delete('/:id', destroy);
