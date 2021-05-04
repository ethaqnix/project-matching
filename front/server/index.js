const express = require("express");
const app = express(); // create express app

app.use(express.static("public"));

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});

app.get("/", (req, res) => {
  console.log("public", "index.html");
  res.sendFile(`${__dirname}/public/index.html`);
});
