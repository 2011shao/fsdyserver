import Database from "@replit/database";
const db = new Database();

async function setUser(openId, userInfo) {
  console.log("存储用户信息", openId, userInfo);
  await db.set(openId, userInfo);
}
async function getUser(openId) {
  let key = await db.get(openId);
  return key;
}

export { setUser, getUser };
db.list().then((keys) => {
  console.log(keys);
});
