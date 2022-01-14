import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ProductController } from './api/handlers/ProductHandler';
import { UserController } from './api/handlers/UserHandler';
import { OrderController } from './api/handlers/OrderHandler';

const app: express.Application = express();

app.use(
    cors({
        origin: 'http://localhost:4200',
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use('/products', ProductController);
app.use('/users', UserController);
app.use('/orders', OrderController);

app.get('/', function (req: Request, res: Response) {
    res.send('home page works');
});

export default app;
