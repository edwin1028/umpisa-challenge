"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const my_event_controller_1 = __importDefault(require("../controllers/my-event.controller"));
const eventRoute = (0, express_1.Router)();
eventRoute.get("/", middlewares_1.Auth, my_event_controller_1.default.get);
eventRoute.get("/:id", middlewares_1.Auth, my_event_controller_1.default.get);
eventRoute.post("/", middlewares_1.Auth, my_event_controller_1.default.create);
eventRoute.put("/:id", middlewares_1.Auth, my_event_controller_1.default.update);
exports.default = eventRoute;
