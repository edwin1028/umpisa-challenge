"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const default_route_1 = __importDefault(require("./default.route"));
const event_type_route_1 = __importDefault(require("./event-type.route"));
const event_route_1 = __importDefault(require("./event.route"));
const my_event_route_1 = __importDefault(require("./my-event.route"));
const user_routes_1 = __importDefault(require("./user.routes"));
let router = (0, express_1.Router)();
router.use("/", default_route_1.default);
router.use("/user", user_routes_1.default);
router.use("/eventType", event_type_route_1.default);
router.use("/myEvents", my_event_route_1.default);
router.use("/event", event_route_1.default);
module.exports = router;
