import CryptoJS from "crypto-js";

export const randomizeSalt = () => {
    const salt =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    const encryptedSalt = CryptoJS.AES.encrypt(
        salt,
        process.env.ENCRYPT_KEY as string
    ).toString();

    return {
        salt,
        encryptedSalt,
    };
};
