import userRouter from "./user.routes";
import defaultRouter from "./default.route";
import { Router } from "express";
import eventTypeRoute from "./event-type.route";
import eventRoute from "./events.route";

let router = Router();

router.use("/", defaultRouter);
router.use("/user", userRouter);
router.use("/eventType", eventTypeRoute);
router.use("/events", eventRoute);

export = router;
