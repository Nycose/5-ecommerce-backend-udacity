"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            var token = authorizationHeader.split(' ')[1];
            var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            next();
        }
        else {
            throw new Error('Authorization header does not exist');
        }
    }
    catch (error) {
        res.status(401).send('Unable to confirm authorization');
    }
};
exports.verifyAuthToken = verifyAuthToken;
