"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const eventRoute = (0, express_1.Router)();
eventRoute.get("/", middlewares_1.Auth, event_controller_1.default.get);
eventRoute.get("/:id", middlewares_1.Auth, event_controller_1.default.get);
exports.default = eventRoute;
