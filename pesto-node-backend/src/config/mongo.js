const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE, MONGO_CLUSTER } =
  process.env;

const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@pestocluster.i3orenq.mongodb.net/?retryWrites=true&w=majority&appName=${MONGO_CLUSTER}`;

// Connect to Atlas cluster
const connectDatabase = async () => {
  try {
    await mongoose.connect(connectionString, {
      autoIndex: true,
      dbName: MONGO_DATABASE,
    });
  } catch (error) {
    console.error("Mongo Connection Error", error);
  }
};

// Disconnect or close connection with database
const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error("Mongo Disconnection Error", error);
  }
};

// db connected and disconnected event listeners
mongoose.connection.on("connected", () =>
  console.log("Connected to Mongodb Atlas")
);
mongoose.connection.on("disconnected", () =>
  console.log("Mongodb Atlas Disconnected")
);

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
