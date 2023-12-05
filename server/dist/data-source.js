"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const dotenv_1 = __importDefault(require("dotenv"));
const UserSetting_1 = require("./entity/UserSetting");
const Event_1 = require("./entity/Event");
const EventType_1 = require("./entity/EventType");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseFloat(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === "development",
    logging: process.env.NODE_ENV === "development",
    entities: [User_1.User, UserSetting_1.UserSetting, Event_1.Event, EventType_1.EventType],
    subscribers: [],
    migrations: [__dirname + "/migration/*.ts"],
    migrationsRun: false,
});
