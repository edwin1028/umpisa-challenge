"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const defaultRouter = (0, express_1.Router)();
defaultRouter.get("/", (req, res) => {
    res.send("Welcome to NodeTs Boilerplate!");
});
exports.default = defaultRouter;
