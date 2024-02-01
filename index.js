import express from "express";
import {
  getAccessToken,
  getDyUserInfo,
  decodePhone,
  getVideoList,
} from "./superdy.js";
import { setUser, getUser } from "./dataTools.js";
const app = express();

app.get("/", async (req, res) => {
  setUser("name", { name: "张三" });
  const user = await getUser("name");
  res.send("Hello World!" + user);
});
app.get("/dyauth", async (req, res) => {
  const { code } = req.query;
  if (code) {
    const result = await getAccessToken(code);
    res.json(result);
  } else {
    res.send("err code");
  }
});
app.get("/videolist", async (req, res) => {
  const { accessToken, openId } = req.query;
  if (accessToken && openId) {
    const result = await getVideoList(req.query);
    res.json(result);
  } else {
    res.send("err code");
  }
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
