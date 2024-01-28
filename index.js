import express from "express";
import {getAccessToken,getDyUserInfo,decodePhone} from "./superdy.js"
const app = express();

app.get("/", async (req, res) => {
  // const result = await getAccessToken();
  // console.log(result);
  const aa=decodePhone('lKZLAh6uwmh2xX8arkSylQ==')
  res.send("Hello World!"+aa);
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
