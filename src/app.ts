import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ProductController } from './api/handlers/ProductHandler';
import { UserController } from './api/handlers/UserHandler';
import { OrderController } from './api/handlers/OrderHandler';

const app: express.Application = express();

// Enable CORS for all origins
app.use(cors());

// Parse incoming request bodies before other handlers
// Available under req.body property
app.use(bodyParser.json());

// Controllers are instances of the express Router object.
// Each router is an isolated instance of middleware and routes.
// Each root URL has it's own router/Controller
app.use('/products', ProductController);
app.use('/users', UserController);
app.use('/orders', OrderController);

export default app;
