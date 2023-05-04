const CryptoJs = require("crypto-js");

export const encryptedAES = (text: string) => {

    const key = CryptoJs.enc.Utf8.parse(process.env.JWT_KEY_SIGNATURE);
    text = CryptoJs.enc.Utf8.parse(text);
  
    const encrypted = CryptoJs.AES.encrypt(text, key, { mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7 });
    const passwordEcrypted = encrypted.ciphertext.toString(CryptoJs.enc.Hex);

    return passwordEcrypted;

}

export const descryptedAES = (text: string) => {

    const key = CryptoJs.enc.Utf8.parse(process.env.JWT_KEY_SIGNATURE);
    text = CryptoJs.enc.Hex.parse(text);
  
    const decryptedAES = CryptoJs.AES.decrypt({ ciphertext: text }, key, { mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7 });
    const decrypted = decryptedAES.toString(CryptoJs.enc.Utf8);
  
    return decrypted
}