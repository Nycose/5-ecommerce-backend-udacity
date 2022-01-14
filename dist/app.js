"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var ProductHandler_1 = require("./api/handlers/ProductHandler");
var UserHandler_1 = require("./api/handlers/UserHandler");
var OrderHandler_1 = require("./api/handlers/OrderHandler");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use('/products', ProductHandler_1.ProductController);
app.use('/users', UserHandler_1.UserController);
app.use('/orders', OrderHandler_1.OrderController);
app.get('/', function (req, res) {
    res.send('home page works');
});
exports.default = app;
