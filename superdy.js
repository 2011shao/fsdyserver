// const client_secret = process.env["client_secret"];
// const client_key = process.env["client_key"];
const client_secret = "e1f3b9c521ca6cbca20e60ba6d59c22e"
const client_key = "awl98juj5xz2ruu9"
import CryptoJS from "crypto"
const encryptedMobile = 'lKZLAh6uwmh2xX8arkSylQ==';
import axios from "axios";
// 获取toekn
async function getAccessToken(code) {
  const url = `https://open.douyin.com/oauth/access_token/`;
  const res = await axios.post(url, {
    grant_type: 'authorization_code',
    client_key: client_key,
    client_secret: client_secret,
    code: code,
  }, {
    headers: {
      'Content-Type': 'application/json',
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
      data: res.data.data.description
    };
  }
}
async function getDyUserInfo(parm) {
  const url = `https://open.douyin.com/oauth/userinfo/`
  const res = await axios.post(url, {
    open_id: parm.open_id,
    access_token: parm.access_token
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  let phoneNumber = ""
  if (res.data.data.error_code == 0) {
    if (res.data.data.encrypt_mobile) {
      phoneNumber = decodePhone(res.data.data.encrypt_mobile)
    }
  }
  return {
    errCode: 0,
    data: "查询成功"
  }

}


function decodePhone(encryptedMobile) {
  const algorithm = 'aes-256-cbc';
  const ivStr = client_secret.substring(0, 16);
  const keyByte = Buffer.from(client_secret)
  const ivByte = Buffer.from(ivStr)
  const encryptedText = Buffer.from(encryptedMobile, "base64")
  try {
    const decipher = CryptoJS.createDecipheriv('aes-256-cbc', keyByte, ivByte)
    decipher.setAutoPadding(true);
    var phone_info = decipher.update(encryptedText, 'binary', 'utf8');
    phone_info += decipher.final('utf8');
  } catch (err) {
    console.log('err: ', err)
  }
  return phone_info
}


//获取视频列表
async function getVideoList(req) {
  const url = 'https://open.douyin.com/api/douyin/v1/video/video_list/'
  const res = await axios.get(url, {
    open_id: req.openId,
    count: 100,
  }, {
    headers: {
      // 'Content-Type': 'application/json',
      "access-token": req.accessToken
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
      data: res.data.data.description
    };
  }
}
export { getAccessToken, getDyUserInfo, decodePhone, getVideoList };
