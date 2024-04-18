const express = require("express");
const dotenv = require("dotenv");

const { todoRoutes } = require("./routes");
const { connectDatabase } = require("./config/mongo");

dotenv.config();

const PORT = process.env.PORT || 9999;
const app = express();

app.use(express.json());
app.use(todoRoutes);

connectDatabase();

app.listen(PORT, () => {
  console.log(`App running at: http://localhost:${PORT}`);
});
