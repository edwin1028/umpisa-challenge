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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventsTable1701567877738 = void 0;
const typeorm_1 = require("typeorm");
class CreateEventsTable1701567877738 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "events",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "images_url",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "date_start",
                        type: "timestamp",
                    },
                    {
                        name: "date_end",
                        type: "timestamp",
                    },
                    {
                        name: "venue",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "type",
                        type: "int",
                    },
                    {
                        name: "publish_date",
                        type: "timestamp",
                    },
                    {
                        name: "tickets",
                        type: "json",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "created_by",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "updated_by",
                        type: "int",
                        isNullable: true,
                    },
                ],
            }), true);
            yield queryRunner.createForeignKey("events", new typeorm_1.TableForeignKey({
                columnNames: ["type"],
                referencedColumnNames: ["id"],
                referencedTableName: "event_type",
                onDelete: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable("event");
            const foreignKey = table === null || table === void 0 ? void 0 : table.foreignKeys.find((fk) => fk.columnNames.indexOf("type") !== -1);
            if (foreignKey) {
                yield queryRunner.dropForeignKey("event", foreignKey);
            }
            yield queryRunner.dropTable("events");
        });
    }
}
exports.CreateEventsTable1701567877738 = CreateEventsTable1701567877738;
