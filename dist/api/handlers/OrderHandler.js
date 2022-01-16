"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
var type_guards_1 = require("../utils/type-guards");
var express_1 = require("express");
var OrderModel_1 = require("../models/OrderModel");
var OrderProductsModel_1 = require("../models/OrderProductsModel");
var orderStore = new OrderModel_1.OrderStore();
var orderProductsStore = new OrderProductsModel_1.OrderProductsStore();
exports.OrderController = (0, express_1.Router)();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderStore.index()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                error_1 = _a.sent();
                if ((0, type_guards_1.isError)(error_1))
                    res.status(400).send(error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(req.params.id);
                return [4 /*yield*/, orderStore.show(orderId)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                error_2 = _a.sent();
                if ((0, type_guards_1.isError)(error_2))
                    res.status(400).send(error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderStore.create(req.body)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                error_3 = _a.sent();
                if ((0, type_guards_1.isError)(error_3))
                    res.status(400).send(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(req.params.id, 10);
                return [4 /*yield*/, orderStore.edit(orderId, req.body.status)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                error_4 = _a.sent();
                if ((0, type_guards_1.isError)(error_4))
                    res.status(400).send(error_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, deleted, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(req.params.id, 10);
                return [4 /*yield*/, orderStore.destroy(orderId)];
            case 1:
                deleted = _a.sent();
                return [2 /*return*/, res.send(deleted)];
            case 2:
                error_5 = _a.sent();
                if ((0, type_guards_1.isError)(error_5))
                    return [2 /*return*/, res.status(400).send(error_5.message)];
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, quantity, addedProduct, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = parseInt(req.params.id, 10);
                productId = parseInt(req.body.product_id, 10);
                quantity = parseInt(req.body.quantity, 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.addProduct(quantity, orderId, productId)];
            case 2:
                addedProduct = _a.sent();
                return [2 /*return*/, res.json(addedProduct)];
            case 3:
                error_6 = _a.sent();
                if ((0, type_guards_1.isError)(error_6))
                    return [2 /*return*/, res.status(400).send(error_6.message)];
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getOrderProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderProductsStore.index()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                error_7 = _a.sent();
                if ((0, type_guards_1.isError)(error_7))
                    return [2 /*return*/, res.status(400).send(error_7.message)];
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getProductsByOrderId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(req.params.id, 10);
                return [4 /*yield*/, orderProductsStore.show(orderId)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                error_8 = _a.sent();
                if ((0, type_guards_1.isError)(error_8))
                    return [2 /*return*/, res.status(400).send(error_8.message)];
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var editProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, quantity, result, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderId = parseInt(req.params.orderId, 10);
                productId = parseInt(req.params.productId, 10);
                quantity = req.body.quantity;
                return [4 /*yield*/, orderProductsStore.edit(quantity, productId, orderId)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                error_9 = _a.sent();
                if ((0, type_guards_1.isError)(error_9))
                    res.status(400).send(error_9.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroyProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, orderId, result, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = parseInt(req.params.productId, 10);
                orderId = parseInt(req.params.orderId, 10);
                return [4 /*yield*/, orderProductsStore.destroy(productId, orderId)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 2:
                error_10 = _a.sent();
                if ((0, type_guards_1.isError)(error_10))
                    res.status(400).send(error_10.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.OrderController.get('/products', getOrderProducts);
exports.OrderController.get('/:id/products', getProductsByOrderId);
exports.OrderController.post('/:id/products', addProduct);
exports.OrderController.put('/:orderId/products/:productId', editProduct);
exports.OrderController.delete('/:orderId/products/:productId', destroyProduct);
exports.OrderController.get('/', index);
exports.OrderController.get('/:id', show);
exports.OrderController.post('/', create);
exports.OrderController.put('/:id', edit);
exports.OrderController.delete('/:id', destroy);
