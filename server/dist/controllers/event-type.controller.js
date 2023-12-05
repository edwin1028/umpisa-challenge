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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const EventType_1 = require("../entity/EventType");
class EventTypeController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventTypes = yield data_source_1.AppDataSource.getRepository(EventType_1.EventType).find();
                res.status(200).json(["SUCCESS", ``, eventTypes]); // status, message, data
            }
            catch (error) {
                res.status(400).json(["FAIL", error.message, error]);
            }
        });
    }
}
exports.default = new EventTypeController();
