import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 6543,
    username: "postgres",
    password: "supersecretpassword",
    database: "dbsample",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.ts"],
    migrationsRun: true,
});
