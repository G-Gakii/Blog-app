import express from "express";
const app = express();

const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello ,Typescript with express ");
});
app.listen(PORT, () => {
  console.log(`listening at port ${PORT} `);
});
