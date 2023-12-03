import { Router } from "express";
import { Auth } from "../middlewares";
import myEventController from "../controllers/my-event.controller";

const eventRoute = Router();

eventRoute.get("/", Auth, myEventController.get);
eventRoute.get("/:id", Auth, myEventController.get);
eventRoute.post("/", Auth, myEventController.create);

export default eventRoute;
