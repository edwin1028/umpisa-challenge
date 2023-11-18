import { Router } from "express";

const defaultRouter = Router();

defaultRouter.get("/", (req, res) => {
    res.send("Welcome to NodeTs Boilerplate!");
});

export default defaultRouter;