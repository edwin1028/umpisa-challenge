import { Router } from "express";
import defaultRouter from "./default.route";
import eventTypeRoute from "./event-type.route";
import eventRoute from "./event.route";
import myEventRoute from "./my-event.route";
import userRouter from "./user.routes";

let router = Router();

router.use("/", defaultRouter);
router.use("/user", userRouter);
router.use("/eventType", eventTypeRoute);
router.use("/myEvents", myEventRoute);
router.use("/event", eventRoute);

export = router;
