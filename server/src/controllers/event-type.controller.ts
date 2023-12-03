import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { EventType } from "../entity/EventType";
import { User } from "../entity/User";

class EventTypeController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const eventTypes = await AppDataSource.getRepository(
                EventType
            ).find();

            res.status(200).json(["SUCCESS", ``, eventTypes]); // status, message, data
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }
}

export default new EventTypeController();
