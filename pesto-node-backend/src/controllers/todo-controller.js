const moment = require("moment");

const Todos = require("../models/todos");
const { TODO_STATUSES } = require("../constants");

// Test endpoint, could be used to provide a list of endpoints
// supported for todos along with their expected inputs
const welcome = (req, res) => {
  res.json({
    endpoint: `${domain}`,
    description: "Welcome",
  });
};

// controller to fetch all the todos from db
const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todos.find({});
    return res.json(allTodos);
  } catch (error) {
    return res.status(500).json({
      error,
      message: error.message,
    });
  }
};

// controller to fetch a specific document from db
const getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    // validates users inputs
    if (!id) {
      return res.status(400).json({
        message: "TodoId is required",
      });
    }

    // finds the document by id and returns data if id is valid
    // else it throws an error "id not found"
    const todo = await Todos.findById(id);
    if (todo) {
      return res.json(todo);
    } else {
      throw new Error("Id not found");
    }
  } catch (error) {
    // returns error and its message in case anything goes wrong in try block
    return res.status(500).json({
      error,
      message: error.message,
    });
  }
};

const createTodo = async (req, res) => {
  const { title, description, status = "to-do", deadline } = req.body;
  // validates input data
  if (!title || !title.length) {
    return res.status(400).json({
      message: "Title is required",
    });
  }
  if (!TODO_STATUSES.includes(status)) {
    return res.status(400).json({
      message: "Status is invalid",
    });
  }

  try {
    // creates the document with payload and returns data
    // else it throws an error
    const newTodo = await Todos.create({
      title,
      description,
      status,
      deadline: moment(deadline).format(),
    });
    if (newTodo) {
      return res.json(todo);
    } else {
      throw new Error("Unable to create a new task");
    }
  } catch (error) {
    // returns error and its message in case anything goes wrong in try block
    return res.status(500).json({
      error,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    // validates user input
    if (!id) {
      return res.status(400).json({
        message: "TodoId is required",
      });
    }

    const update = req.body;
    let isValid = true;
    for (let [key, val] of Object.entries(update)) {
      if (key === "title" && !val.length) isValid = false;
      if (key === "status" && !TODO_STATUSES.includes(val)) isValid = false;
    }
    if (!isValid) {
      // returns error and its message in case anything goes wrong in try block
      return res.status(400).json({
        message: "Invalid update",
      });
    }

    // finds the document by id and updates it with the payload provided, returns data if id is valid
    // else it throws an error "id not found"
    const todo = await Todos.findByIdAndUpdate(id, update, { new: true });
    if (todo) {
      return res.json(todo);
    } else {
      throw new Error("Id not found");
    }
  } catch (error) {
    // returns error and its message in case anything goes wrong in try block
    return res.status(500).json({
      error,
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "TodoId is required",
      });
    }

    // finds the document by id and returns deletes document if id is valid
    // else it throws an error "id not found"
    const todo = await Todos.deleteOne({ _id: id });
    if (todo) {
      return res.json(todo);
    } else {
      throw new Error("Id not found");
    }
  } catch (error) {
    // returns error and its message in case anything goes wrong in try block
    return res.status(500).json({
      error,
      message: error.message,
    });
  }
};

module.exports = {
  welcome,
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
