import { User } from "../entity/User";
import CryptoJS from "crypto-js";
import { Request, Response, NextFunction } from "express";
import { randomizeSalt } from "../utilities";
import { AppDataSource } from "../data-source";
import moment from "moment-timezone";

class UserController {
    ds: any;

    constructor() {
        this.ds = AppDataSource;
    }

    async get(req: Request, res: Response, next: NextFunction) {
        res.status(200).json("UserController get works!");
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const { salt, encryptedSalt } = randomizeSalt();
        const hashedPassword = CryptoJS.HmacSHA256(
            `${salt}${password}`,
            process.env.HASH_KEY as string
        ).toString(CryptoJS.enc.Hex);

        try {
            const result = await AppDataSource.getRepository(User).save({
                email,
                password: hashedPassword,
                salt: encryptedSalt,
            });

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(`UserController: create ERROR || ${error}`);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
    }
}

export default new UserController();
