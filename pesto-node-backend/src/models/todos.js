const mongoose = require("mongoose");

const { connectDatabase, disconnectDatabase } = require("../config/mongo");
const constants = require("../constants");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: constants.TODO_STATUSES,
    required: true,
  },
  deadline: Date,
});

const Todos = mongoose.model("Todo", todoSchema);

module.exports = Todos;
