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
exports.CreateUserSettingTable1701567952147 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserSettingTable1701567952147 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "user_setting",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "setting",
                        type: "json",
                        default: `'${JSON.stringify({ theme_mode: 'light' })}'`
                    },
                ],
            }), true);
            yield queryRunner.createForeignKey("user_setting", new typeorm_1.TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable("user_setting");
            const foreignKey = table === null || table === void 0 ? void 0 : table.foreignKeys.find((fk) => fk.columnNames.indexOf("user_id") !== -1);
            if (foreignKey) {
                yield queryRunner.dropForeignKey("user_setting", foreignKey);
            }
            yield queryRunner.dropTable("user_setting");
        });
    }
}
exports.CreateUserSettingTable1701567952147 = CreateUserSettingTable1701567952147;
