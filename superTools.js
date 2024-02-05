import CryptoJS from 'crypto-js'
const servers_key = "xiaoyuzhouencryptkey" //服务端加密的key
// 加密
const serverEncrypt = (message, key = servers_key) => {
  let valueStr = message
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(valueStr, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return encrypted
}
// DES 解密
const serverDecrypt = (text, key = servers_key) => {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var message = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(text)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)
  return message
}
export default {
  serverEncrypt,
  serverDecrypt
}
const a=serverEncrypt('act.3.hn6QwbubJwAvP9P4RaERErW5_7HnLpPEEs8TvYpEh-zBFqV60rtHKhd9Qg0yCnpW5WP6N8oI2EsxrGGDtm-JPSb_FJn6IISkRAgrtOBHgXbfuRYBS5FyzkMk1lh-4IYku07HS_Y3h_OajpSuM8tJ85otTl1Q21y82s-yXw==')
const b=serverDecrypt('aRevZAOT4FTf/TP/rHgBzG+wt6zrywOrHZkJ2I4+RSR1GDpL8MxQJU9veZ2hBT7Kg828cNoGYTqIIXMiKPl7PLXuKkM3owhfZhE9AYIxllzvs9mofCUXQB/Vl7cizFxeYooLwjjYqFCIQbeWjgBXQmqo+Qf4EAAkKcEtmxkoxp0thv47CcG5wPW5bLh0shKcWSamB7DUDPUOhtkIIyHOFS9dnYgjKAK4JAHSCQzUjOM=')
console.log('加密',a)
console.log('加密',b)
