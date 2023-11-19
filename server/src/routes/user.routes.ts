import { Router } from "express";
import { UserController } from "../controllers";
import { Auth } from "../middlewares";

const userRouter = Router();

userRouter.get("/", Auth, UserController.get);
userRouter.post("/", UserController.create);
userRouter.get("/login", UserController.checkLogin);
userRouter.post("/login", UserController.login);
userRouter.get("/logout", Auth, UserController.logout);

export default userRouter;
