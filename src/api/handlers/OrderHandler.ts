import { isError } from '../utils/type-guards';
import { Router, Request, Response } from 'express';
import { OrderStore } from '../models/OrderModel';
import { OrderProductsStore } from '../models/OrderProductsModel';

const orderStore = new OrderStore();
const orderProductsStore = new OrderProductsStore();
export const OrderController = Router();

const index = async (_req: Request, res: Response) => {
    try {
        const result = await orderStore.index();
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id);
        const result = await orderStore.show(orderId);
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.create(req.body);
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

const edit = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const result = await orderStore.edit(orderId, req.body.status);
        return res.json(result);
    } catch (error) {
        if (isError(error)) res.status(400).send(error.message);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const deleted = await orderStore.destroy(orderId);
        return res.send(deleted);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

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

const getOrderProducts = async (req: Request, res: Response) => {
    try {
        const result = await orderProductsStore.index();
        return res.json(result);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

const getProductsByOrderId = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const result = await orderProductsStore.show(orderId);
        return res.json(result);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

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
