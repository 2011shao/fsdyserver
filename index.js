import express from "express";
import { getAccessToken, getDyUserInfo, decodePhone,getVideoList } from "./superdy.js"
const app = express();

app.get("/", async (req, res) => {
  res.send("Hello World!");
});
app.get("/dyauth", async (req, res) => {
  const { code } = req.query
  if (code) {
    const result = await getAccessToken(code);
    res.json(result)
  } else {
    res.send('err code')
  }
});
app.get("/videolist", async (req, res) => {
  const { accessToken,openId } = req.query
  if (accessToken && openId) {
    const result = await getVideoList(req.query);
    res.json(result)
  } else {
    res.send('err code')
  }
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
