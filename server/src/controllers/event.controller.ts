import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { EventType } from "../entity/EventType";
import { User } from "../entity/User";
import { Event } from "../entity/Event";
import moment from "moment-timezone";

class EventController {
    async create(req: Request, res: Response, next: NextFunction) {
        const {
            title,
            description,
            images_url,
            start_date,
            end_date,
            venue,
            type,
        } = req.body;

        try {
            await AppDataSource.getRepository(Event).save({
                title,
                description,
                date_start: moment(start_date).format("YYYY-MM-DD HH:mm:ss"),
                date_end: moment(end_date).format("YYYY-MM-DD HH:mm:ss"),
                type: [type?.id],
            });

            res.status(200).json(["SUCCESS", "Event successfully created.", {}]); // status, message, data
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }
}

export default new EventController();
