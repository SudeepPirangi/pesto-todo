const express = require("express");

const { todo } = require("../controllers");

const todoRoutes = express.Router();

todoRoutes.get("/", todo.welcome);
todoRoutes.get("/todos", todo.getAllTodos);
todoRoutes.get("/todos/:id", todo.getTodo);
todoRoutes.post("/todos", todo.createTodo);
todoRoutes.put("/todos/:id", todo.updateTodo);
todoRoutes.delete("/todos/:id", todo.deleteTodo);

module.exports = todoRoutes;
