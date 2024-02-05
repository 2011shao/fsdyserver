import CryptoJS from "crypto-js";
const servers_key = process.env["encrypt_key"];

// 加密
const serverEncrypt = (message, key = servers_key) => {
  let valueStr = message;
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(valueStr, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  return encrypted;
};
// DES 解密
const serverDecrypt = (text, key = servers_key) => {
  console.log("text", servers_key);
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var message = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(text),
    },
    keyHex,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    },
  ).toString(CryptoJS.enc.Utf8);
  return message;
};
export { serverEncrypt, serverDecrypt };
