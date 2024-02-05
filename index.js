import express from "express";
import cors from "cors";
import {
  getAccessToken,
  getVideoList,
} from "./superdy.js";
const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World!");
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
  const { access_token, open_id } = req.query;
  if (access_token && open_id) {
    const result = await getVideoList(req.query);
    res.json(result);
  } else {
    res.send("err code");
  }
});
app.post("/videolist", async (req, res) => {
  const { access_token, open_id } = req.body;
  if (access_token && open_id) {
    const result = await getVideoList(req.query);
    res.json(result);
  } else {
    res.send("err code");
  }
});
app.get("/userlist", async (req, res) => {
  const { baseId } = req.query;
  if (accessToken && openId) {
    const result = await getAllAuthUser(baseId);
    res.json({ errCode: 0, data: result });
  } else {
    res.send("err code");
  }
});
app.listen(3000, () => {
  console.log("Express server initialized");
});
