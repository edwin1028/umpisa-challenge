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
const typeorm_1 = require("typeorm");
class EventController {
    get(req, res, next) {
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
                            publish_date: (0, typeorm_1.LessThanOrEqual)((0, moment_timezone_1.default)().toDate()),
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
}
exports.default = new EventController();
