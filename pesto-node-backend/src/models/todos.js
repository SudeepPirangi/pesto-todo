const mongoose = require("mongoose");

const constants = require("../constants");

// configures a schema/blueprint for todo collection in db
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

// maps the schema to the collection 'todos'
// notice that mongo converts "Todo" to "todos" while creating collection
const Todos = mongoose.model("Todo", todoSchema);

module.exports = Todos;
