const client_secret = process.env["client_secret"];
const client_key = process.env["client_key"];
import CryptoJS from "crypto";
const encryptedMobile = "lKZLAh6uwmh2xX8arkSylQ==";
import axios from "axios";
import { serverDecrypt, serverEncrypt } from "./superTools.js";
// 获取toekn
async function getAccessToken(code) {
  const url = `https://open.douyin.com/oauth/access_token/`;
  const res = await axios.post(
    url,
    {
      grant_type: "authorization_code",
      client_key: client_key,
      client_secret: client_secret,
      code: code,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (res.data.data.error_code == 0) {
    const userRes = await getDyUserInfo(res.data.data);
    if (userRes.errCode == 0) {
      Object.assign(res.data.data, userRes.data);
      res.data.data["open_id"] = serverEncrypt(res.data.data["open_id"]);
      res.data.data["access_token"] = serverEncrypt(
        res.data.data["access_token"],
      );
      return {
        errCode: 0,
        data: res.data.data,
      };
    }
  } else {
    return {
      errCode: 1,
      data: res.data.data.description,
    };
  }
}
async function getDyUserInfo(parm) {
  const url = `https://open.douyin.com/oauth/userinfo/`;
  const res = await axios.post(
    url,
    {
      open_id: parm.open_id,
      access_token: parm.access_token,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  // let phoneNumber = "";
  if (res.data.data.error_code == 0) {
    return {
      errCode: 0,
      data: res.data.data,
    };
    // if (res.data.data.encrypt_mobile) {
    //   phoneNumber = decodePhone(res.data.data.encrypt_mobile);
    // }
  }
  return {
    errCode: 0,
    data: "查询成功",
  };
}

function decodePhone(encryptedMobile) {
  const algorithm = "aes-256-cbc";
  const ivStr = client_secret.substring(0, 16);
  const keyByte = Buffer.from(client_secret);
  const ivByte = Buffer.from(ivStr);
  const encryptedText = Buffer.from(encryptedMobile, "base64");
  try {
    const decipher = CryptoJS.createDecipheriv("aes-256-cbc", keyByte, ivByte);
    decipher.setAutoPadding(true);
    var phone_info = decipher.update(encryptedText, "binary", "utf8");
    phone_info += decipher.final("utf8");
  } catch (err) {
    console.log("err: ", err);
  }
  return phone_info;
}

//获取视频列表
async function getVideoList(req) {
  const open_id = serverDecrypt(req.open_id);
  const access_token = serverDecrypt(req.access_token);
  const url = `https://open.douyin.com/api/douyin/v1/video/video_list/?open_id=${open_id}&count=100&cursor=0&`;
  const res = await axios.get(url, {
    headers: {
      "access-token": access_token,
    },
  });
  if (res.data.data.error_code == 0) {
    return {
      errCode: 0,
      data: res.data.data,
    };
  } else {
    return {
      errCode: 1,
      data: res.data.data.description,
    };
  }
}
export { getAccessToken, getDyUserInfo, decodePhone, getVideoList };
