"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const eventTypeRoute = (0, express_1.Router)();
eventTypeRoute.get("/", middlewares_1.Auth, controllers_1.EventTypeController.get);
exports.default = eventTypeRoute;
