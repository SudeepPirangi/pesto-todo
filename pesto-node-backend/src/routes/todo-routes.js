const express = require("express");

const { todo } = require("../controllers");

const todoRoutes = express.Router();

// configures all the routes with their respective controllers
todoRoutes.get("/", todo.welcome);
todoRoutes.get("/todos", todo.getAllTodos);
todoRoutes.get("/todos/:id", todo.getTodo);
todoRoutes.post("/todos", todo.createTodo);
todoRoutes.patch("/todos/:id", todo.updateTodo);
todoRoutes.delete("/todos/:id", todo.deleteTodo);

module.exports = todoRoutes;
