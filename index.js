import express from "express";
import { getAccessToken } from "./superdy";
const app = express();

app.get("/", async (req, res) => {
  const result = await getAccessToken();
  console.log(result);
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
