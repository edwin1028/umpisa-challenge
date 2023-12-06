import { Router } from "express";
import { EventTypeController } from "../controllers";
import { Auth } from "../middlewares";

const eventTypeRoute = Router();

eventTypeRoute.get("/", Auth, EventTypeController.get);
eventTypeRoute.post("/", Auth, EventTypeController.seed);

export default eventTypeRoute;
