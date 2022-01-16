"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidStatus = void 0;
var isValidStatus = function (status) {
    var valid = ['open', 'complete'].includes(status);
    if (!valid) {
        throw new Error("Please enter a valid order status ['open', 'complete']");
    }
    else {
        return true;
    }
};
exports.isValidStatus = isValidStatus;
