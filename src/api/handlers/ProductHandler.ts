import { Router, Request, Response } from 'express';
import { ProductInterface } from '../interfaces/product';
import { ProductStore } from '../models/ProductModel';
import { verifyAuthToken } from '../middlewares/auth';
import { isError } from '../utils/type-guards';

const productStore = new ProductStore();
export const ProductController = Router();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await productStore.index();
        return res.send(products);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const product = await productStore.show(productId);
        return res.send(product);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product: ProductInterface = {
            name: req.body.name,
            price: parseInt(req.body.price, 10),
            description: req.body.description,
            image: req.body.image,
            category: parseInt(req.body.category, 10),
        };

        const newProduct = await productStore.create(product);
        return res.send(newProduct);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const deleted = await productStore.destroy(productId);
        return res.send(deleted);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

const getProductCategories = async (req: Request, res: Response) => {
    try {
        const result = await productStore.getProductCategories();
        return res.send(result);
    } catch (error) {
        if (isError(error)) return res.status(400).send(error.message);
    }
};

ProductController.get('/categories', getProductCategories);
ProductController.get('/', index);
ProductController.get('/:id', show);
ProductController.post('/', create);
ProductController.delete('/:id', verifyAuthToken, destroy);
