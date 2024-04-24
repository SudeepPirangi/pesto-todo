const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");

const { todoRoutes } = require("./routes");
const { connectDatabase } = require("./config/mongo");

// needed to read env variables
dotenv.config();

// get port number from env variables or default to 9999
const PORT = process.env.PORT || 9999;
const app = express();

// configures cors middleware for the clients to access endpoint
// in production more securities to be added to validate the requestor
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
// middleware to make request readable in json format
app.use(express.json());
app.use(todoRoutes);

// makes a connection to database
// connections could also be made on-demand while interacting with db
connectDatabase();

// starts server on given port number
app.listen(PORT, () => {
  console.log(`App running at: http://localhost:${PORT}`);
});

module.exports = app;
