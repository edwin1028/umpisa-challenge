"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.decrypt = exports.randomizeSalt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const randomizeSalt = () => {
    const salt = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    const encryptedSalt = crypto_js_1.default.AES.encrypt(salt, process.env.ENCRYPT_KEY).toString();
    return {
        salt,
        encryptedSalt,
    };
};
exports.randomizeSalt = randomizeSalt;
const decrypt = (str, secretKey) => {
    return crypto_js_1.default.AES.decrypt(str, secretKey).toString(crypto_js_1.default.enc.Utf8);
};
exports.decrypt = decrypt;
const hash = (str, secretKey) => {
    return crypto_js_1.default.HmacSHA256(str, secretKey).toString(crypto_js_1.default.enc.Hex);
};
exports.hash = hash;
