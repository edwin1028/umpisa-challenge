import { Router } from "express";
import { Auth } from "../middlewares";
import eventController from "../controllers/event.controller";

const eventRoute = Router();

eventRoute.get("/", Auth, eventController.get);
eventRoute.get("/:id", Auth, eventController.get);

export default eventRoute;
