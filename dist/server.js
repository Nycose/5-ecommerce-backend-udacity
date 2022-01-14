"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var address = 'http://localhost:3000/';
var PORT = 3000;
app_1.default.listen(PORT, function () {
    console.log("** Server is listening on " + address + " **");
});
