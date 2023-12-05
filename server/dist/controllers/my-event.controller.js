"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Event_1 = require("../entity/Event");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class MyEventController {
    get(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let events = [];
                if (id) {
                    events = yield data_source_1.AppDataSource.getRepository(Event_1.Event).findOne({
                        where: {
                            id: parseInt(id),
                        },
                    });
                }
                else {
                    events = yield data_source_1.AppDataSource.getRepository(Event_1.Event).find({
                        relations: ["type"],
                        where: {
                            created_by: ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id) || null,
                        },
                        order: {
                            created_at: "DESC",
                        },
                    });
                }
                res.status(200).json([
                    "SUCCESS",
                    "Event successfully fetched.",
                    events,
                ]); // status, message, data
            }
            catch (error) {
                res.status(400).json(["FAIL", error.message, error]);
            }
        });
    }
    create(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, images_url, start_date, end_date, venue, type, tickets, publish_date, } = req.body;
            try {
                yield data_source_1.AppDataSource.getRepository(Event_1.Event).save({
                    title,
                    description,
                    date_start: (0, moment_timezone_1.default)(start_date).format("YYYY-MM-DD HH:mm:ss"),
                    date_end: (0, moment_timezone_1.default)(end_date).format("YYYY-MM-DD HH:mm:ss"),
                    publish_date: (0, moment_timezone_1.default)(publish_date).format("YYYY-MM-DD HH:mm:ss"),
                    type: type === null || type === void 0 ? void 0 : type.id,
                    tickets: tickets.map((ticket) => (Object.assign(Object.assign({}, ticket), { ticket_qty_init: ticket === null || ticket === void 0 ? void 0 : ticket.ticket_qty }))),
                    created_by: ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id) || null,
                });
                res.status(200).json([
                    "SUCCESS",
                    "Event successfully created.",
                    {},
                ]); // status, message, data
            }
            catch (error) {
                res.status(400).json(["FAIL", error.message, error]);
            }
        });
    }
    update(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, images_url, start_date, end_date, venue, type, tickets, publish_date, } = req.body;
            const { id } = req.params;
            try {
                const event = yield data_source_1.AppDataSource.getRepository(Event_1.Event).update({
                    id: Number(id),
                }, {
                    title,
                    description,
                    date_start: (0, moment_timezone_1.default)(start_date).format("YYYY-MM-DD HH:mm:ss"),
                    date_end: (0, moment_timezone_1.default)(end_date).format("YYYY-MM-DD HH:mm:ss"),
                    publish_date: (0, moment_timezone_1.default)(publish_date).format("YYYY-MM-DD HH:mm:ss"),
                    type: type === null || type === void 0 ? void 0 : type.id,
                    tickets: tickets.map((ticket) => (Object.assign(Object.assign({}, ticket), { ticket_qty_init: ticket === null || ticket === void 0 ? void 0 : ticket.ticket_qty }))),
                    updated_by: ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id) || null,
                });
                res.status(200).json([
                    "SUCCESS",
                    "Event successfully updated.",
                    event,
                ]); // status, message, data
            }
            catch (error) {
                res.status(400).json(["FAIL", error.message, error]);
            }
        });
    }
}
exports.default = new MyEventController();
