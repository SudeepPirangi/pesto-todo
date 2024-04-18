const express = require("express");

const PORT = process.env.PORT || 9999;
const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}, url : http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
