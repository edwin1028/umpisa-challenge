import { Router } from "express";
import { Auth } from "../middlewares";
import eventController from "../controllers/event.controller";

const eventRoute = Router();

eventRoute.post("/", Auth, eventController.create);

export default eventRoute;
