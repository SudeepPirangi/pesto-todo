import axios from "axios";

import constants from "../constants";

const { TODO_URL } = constants;

export const getAllTodos = async () => axios.get(`${TODO_URL}`);

export const getTodo = async (todoId) => axios.get(`${TODO_URL}/${todoId}`);

export const createTodo = async (todo) => axios.post(`${TODO_URL}`, todo);

export const updateTodo = async (todoId, update) =>
  axios.patch(`${TODO_URL}/${todoId}`, update);

export const deleteTodo = async (todoId) =>
  axios.delete(`${TODO_URL}/${todoId}`);
