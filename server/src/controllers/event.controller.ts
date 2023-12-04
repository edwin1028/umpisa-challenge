import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { EventType } from "../entity/EventType";
import { User } from "../entity/User";
import { Event } from "../entity/Event";
import moment from "moment-timezone";
import { ISession } from "../interfaces/session.interface";
import { MoreThan } from "typeorm";

class EventController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            let events: any = [];

            if (id) {
                events = await AppDataSource.getRepository(Event).findOne({
                    where: {
                        id: parseInt(id),
                    }
                });
            } else {
                events = await AppDataSource.getRepository(Event).find({
                    relations: ["type"],
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
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }
}

export default new EventController();
