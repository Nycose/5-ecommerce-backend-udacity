import { Router, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { UserInterface } from '../interfaces/user';
import { UserStore } from '../models/UserModel';

const store = new UserStore();
export const UserController = Router();

const index = async (_req: Request, res: Response) => {
    try {
        const users: UserInterface[] = await store.index();
        return res.json(users);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userid, 10);
        const user: UserInterface = await store.show(userId);
        return res.json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, username, password, is_admin } =
            req.body;
        // Check if user exists
        const users = await store.index();
        if (users.find((u) => u.username === username)) {
            throw new Error('User already exists');
        } else {
            await store.create(
                first_name,
                last_name,
                username,
                password,
                is_admin
            );
            const newUser = {
                username: username,
                is_admin: is_admin,
            };
            const token = jwt.sign(
                { user: newUser },
                process.env.TOKEN_SECRET as Secret
            );
            return res.json(token);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const login = await store.authenticate(username, password);
        return res.send(login);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
};

UserController.get('/', index);
UserController.get('/:userid', show);
UserController.post('/', create);
UserController.post('/login', login);
