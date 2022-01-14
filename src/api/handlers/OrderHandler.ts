import { isError } from '../utils/type-guards';
import { Router, Request, Response } from 'express';
import { OrderStore } from '../models/OrderModel';

const orderStore = new OrderStore();
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

const addProduct = async (req: Request, res: Response) => {
    const orderId: number = parseInt(req.params.id, 10);
    const productId: number = parseInt(req.body.productId, 10);
    const quantity: number = parseInt(req.body.quantity);

    try {
        const addedProduct = await orderStore.addProduct(
            quantity,
            orderId,
            productId
        );
        return res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
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

OrderController.get('/', index);
OrderController.get('/:id', show);
OrderController.post('/', create);
OrderController.post('/:id/products', addProduct);
OrderController.delete('/:id', destroy);
