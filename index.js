import express from "express";
import { getAccessToken, getDyUserInfo, decodePhone } from "./superdy.js"
const app = express();

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/dyauth/", async (req, res) => {
  const { code } = req.query
  if (code) {
    const result = await getAccessToken(code);
    // console.log('code',result)

    res.json(result)

  } else {
    res.send('err code')
  }

  // // console.log(result);
  // // const aa=decodePhone('lKZLAh6uwmh2xX8arkSylQ==')
  // res.send("Hello World!"+req.query);
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
