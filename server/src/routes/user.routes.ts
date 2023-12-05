import { Router } from "express";
import { UserController } from "../controllers";
import { Auth } from "../middlewares";

const userRouter = Router();

userRouter.get("/", Auth, UserController.get);
userRouter.post("/", Auth, UserController.create);
userRouter.get("/login", Auth, UserController.checkLogin);
userRouter.post("/login", UserController.login);
userRouter.get("/logout", UserController.logout);
userRouter.post("/update-setting/:id", UserController.updateSetting);

export default userRouter;
