"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeController = exports.UserController = void 0;
const user_controller_1 = __importDefault(require("./user.controller"));
exports.UserController = user_controller_1.default;
const event_type_controller_1 = __importDefault(require("./event-type.controller"));
exports.EventTypeController = event_type_controller_1.default;
