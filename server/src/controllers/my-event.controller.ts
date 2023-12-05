import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { EventType } from "../entity/EventType";
import { User } from "../entity/User";
import { Event } from "../entity/Event";
import moment from "moment-timezone";
import { ISession } from "../interfaces/session.interface";

class MyEventController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            let events: any = [];

            if (id) {
                events = await AppDataSource.getRepository(Event).findOne({
                    where: {
                        id: parseInt(id),
                    },
                });
            } else {
                events = await AppDataSource.getRepository(Event).find({
                    relations: ["type"],
                    where: {
                        created_by:
                            ((req.session as ISession).user as any)?.id || null,
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
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const {
            title,
            description,
            images_url,
            start_date,
            end_date,
            venue,
            type,
            tickets,
            publish_date,
        } = req.body;

        try {
            await AppDataSource.getRepository(Event).save({
                title,
                description,
                date_start: moment(start_date).format("YYYY-MM-DD HH:mm:ss"),
                date_end: moment(end_date).format("YYYY-MM-DD HH:mm:ss"),
                publish_date: moment(publish_date).format(
                    "YYYY-MM-DD HH:mm:ss"
                ),
                type: type?.id,
                tickets: tickets.map((ticket: any) => ({
                    ...ticket,
                    ticket_qty_init: ticket?.ticket_qty,
                })),
                created_by: ((req.session as ISession).user as any)?.id || null,
            });

            res.status(200).json([
                "SUCCESS",
                "Event successfully created.",
                {},
            ]); // status, message, data
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const {
            title,
            description,
            images_url,
            start_date,
            end_date,
            venue,
            type,
            tickets,
            publish_date,
        } = req.body;

        const { id } = req.params;
        try {
            const event = await AppDataSource.getRepository(Event).update(
                {
                    id: Number(id),
                },
                {
                    title,
                    description,
                    date_start: moment(start_date).format(
                        "YYYY-MM-DD HH:mm:ss"
                    ),
                    date_end: moment(end_date).format("YYYY-MM-DD HH:mm:ss"),
                    publish_date: moment(publish_date).format(
                        "YYYY-MM-DD HH:mm:ss"
                    ),
                    type: type?.id,
                    tickets: tickets.map((ticket: any) => ({
                        ...ticket,
                        ticket_qty_init: ticket?.ticket_qty,
                    })),
                    updated_by:
                        ((req.session as ISession).user as any)?.id || null,
                }
            );

            res.status(200).json([
                "SUCCESS",
                "Event successfully updated.",
                event,
            ]); // status, message, data
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }
}

export default new MyEventController();
