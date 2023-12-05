import { Router } from "express";
import { EventTypeController } from "../controllers";
import { Auth } from "../middlewares";

const eventTypeRoute = Router();

eventTypeRoute.get("/", Auth, EventTypeController.get);

export default eventTypeRoute;
