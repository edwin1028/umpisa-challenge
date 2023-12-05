"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    process.env.TZ = 'Asia/Manila';
    const app = (0, express_1.default)();
    const port = process.env.PORT || 8000;
    const routePrefix = process.env.API_V1 || "/api/v1";
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        name: "sid",
        unset: "destroy",
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        },
    }));
    app.use(routePrefix, routes_1.default);
    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
