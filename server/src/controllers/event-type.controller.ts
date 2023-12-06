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

    async seed(req: Request, res: Response, next: NextFunction) {
        try {
            await AppDataSource.getRepository(EventType).save([
                { name: "Conference" },
                { name: "Seminar, Talk" },
                { name: "Tradeshow" },
                { name: "Convention" },
                { name: "Festival, Fair" },
                { name: "Concert, Performance" },
                { name: "Screening" },
                { name: "Dinner, Gala" },
                { name: "Class, Training, Workshop" },
                { name: "Meeting, Networking Event" },
                { name: "Party or Social Gathering" },
                { name: "Rally" },
                { name: "Tournament" },
                { name: "Game, Competition" },
                { name: "Race or Endurance Event" },
                { name: "Tour" },
                { name: "Attraction" },
                { name: "Camp, Trip, Retreat" },
            ]);

            res.status(200).json([
                "SUCCESS",
                "Event types successfully created.",
                {},
            ]); // status, message, data
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }
}

export default new EventTypeController();
