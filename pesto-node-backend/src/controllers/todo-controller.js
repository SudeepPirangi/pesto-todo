const moment = require("moment");

const Todos = require("../models/todos");
const { TODO_STATUSES } = require("../constants");

const welcome = (req, res) => {
  res.json({
    endpoint: `${domain}`,
    description: "Welcome",
  });
};

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

const getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "TodoId is required",
      });
    }

    const todo = await Todos.findById(id);
    return res.json(todo);
  } catch (error) {
    return res.status(500).json({
      error,
      message: error.message,
    });
  }
};

const createTodo = async (req, res) => {
  const { title, description, status = "to-do", deadline } = req.body;
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
    const newTodo = await Todos.create({
      title,
      description,
      status,
      deadline: moment(deadline).format(),
    });
    return res.json(newTodo);
  } catch (error) {
    return res.status(500).json({
      error,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
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
      return res.status(400).json({
        message: "Invalid update",
      });
    }

    const todo = await Todos.findByIdAndUpdate(id, update, { new: true });
    return res.json(todo);
  } catch (error) {
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

    const todo = await Todos.deleteOne({ _id: id });
    return res.json(todo);
  } catch (error) {
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
