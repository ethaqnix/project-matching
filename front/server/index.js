const express = require("express");
const app = express(); // create express app

app.use(express.static("public"));

app.listen(5000, () => {
  console.log("server started on port 5000");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
