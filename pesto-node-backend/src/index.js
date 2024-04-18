const express = require("express");

const { todoRoutes } = require("./routes");

const PORT = process.env.PORT || 9999;
const app = express();

app.use(todoRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}, url: http://localhost:${PORT}`);
});
