const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");

const { todoRoutes } = require("./routes");
const { connectDatabase } = require("./config/mongo");

dotenv.config();

const PORT = process.env.PORT || 9999;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(todoRoutes);

connectDatabase();

app.listen(PORT, () => {
  console.log(`App running at: http://localhost:${PORT}`);
});
