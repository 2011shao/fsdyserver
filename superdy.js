const client_secret = process.env["client_secret"];
const client_key = process.env["client_key"];
// 获取toekn
async function getAccessToken(code) {
  const url = `https://open.douyin.com/oauth/access_token/`;
  const res = await uniCloud.httpclient.request(url, {
    dataType: "json",
    method: "POST",
    data: {
      grant_type: "authorization_code",
      client_key: client_key,
      client_secret: client_secret,
      code: code,
    },
  });
  if (res.data.data.error_code == 0) {
    return {
      errCode: 0,
      data: res,
    };
  } else {
    return {
      errCode: 1,
      data: res,
    };
  }
}

export { getAccessToken };
