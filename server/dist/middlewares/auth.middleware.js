"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = (req, res, next) => {
    var _a;
    const { token } = req.session;
    const [bearer, authToken] = (((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || "").split(" ");
    if (!token &&
        req.headers["user-agent"]
            .toLowerCase()
            .includes("postman") &&
        process.env.NODE_ENV === "development" &&
        process.env.POSTMAN_TOKEN === authToken) {
        next();
        return;
    }
    if (!token) {
        return res.status(401).json(["FAIL", "Unauthorized"]);
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.status(401).json(["FAIL", "Access Forbidden."]);
        }
        req.user = user;
        next();
    });
};
exports.default = Auth;
