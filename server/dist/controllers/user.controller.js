"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const utilities_1 = require("../utilities");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSetting_1 = require("../entity/UserSetting");
class UserController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json("UserController get works!");
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { salt, encryptedSalt } = (0, utilities_1.randomizeSalt)();
            const salted = (0, utilities_1.hash)(`${salt}${password}`, process.env.HASH_KEY);
            try {
                const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({
                    email,
                });
                if (user) {
                    throw new Error("Email already exist.");
                }
                yield data_source_1.AppDataSource.getRepository(User_1.User).save({
                    email,
                    password: salted,
                    salt: encryptedSalt,
                });
                res.status(200).json(["SUCCESS", "User created.", {}]); // status, message, data
            }
            catch (error) {
                res.status(400).json(["FAIL", error.message, error]);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({
                    email,
                });
                if (user) {
                    const salt = (0, utilities_1.decrypt)(user.salt, process.env.ENCRYPT_KEY);
                    const salted = (0, utilities_1.hash)(`${salt}${password}`, process.env.HASH_KEY);
                    const validatedUser = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({
                        email,
                        password: salted,
                    });
                    const userSetting = yield data_source_1.AppDataSource.getRepository(UserSetting_1.UserSetting).findOne({
                        relations: ["user"],
                        where: {
                            user: {
                                id: validatedUser === null || validatedUser === void 0 ? void 0 : validatedUser.id,
                            },
                        },
                    });
                    if (!validatedUser) {
                        throw new Error("Username or password does not match.");
                    }
                    const token = jsonwebtoken_1.default.sign({ id: validatedUser.id, email }, process.env.JWT_KEY, {
                        expiresIn: "1h",
                    });
                    req.session.token = token;
                    req.session.user = {
                        id: validatedUser.id,
                        email: validatedUser.email,
                    };
                    res.status(200).json([
                        "SUCCESS",
                        `Welcome back ${validatedUser.email}!`,
                        Object.assign(Object.assign({}, validatedUser), { setting: userSetting === null || userSetting === void 0 ? void 0 : userSetting.setting }),
                    ]); // status, message, data
                }
                else {
                    throw new Error("Username or password does not match.");
                }
            }
            catch (error) {
                res.status(400).json(["FAIL", error.message, error]);
            }
        });
    }
    checkLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            res.status(200).json(["SUCCESS", "Is logged", user]);
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session) {
                req.session.destroy((err) => {
                    if (err) {
                        res.status(400).json(["FAIL", "Unable to log out."]);
                    }
                    else {
                        res.status(200).json(["SUCCESS", "Logout successful."]);
                    }
                });
            }
            else {
                res.end();
            }
        });
    }
    updateSetting(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setting } = req.body;
            const { id } = req.params;
            try {
                const userSetting = yield data_source_1.AppDataSource.getRepository(UserSetting_1.UserSetting).update({
                    user: {
                        id: Number(id),
                    },
                }, {
                    setting,
                });
                res.status(200).json([
                    "SUCCESS",
                    "User setting successfully updated.",
                    userSetting,
                ]); // status, message, data
            }
            catch (error) {
                res.status(400).json(["FAIL", error.message, error]);
            }
        });
    }
}
exports.default = new UserController();
