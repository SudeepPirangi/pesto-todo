import axios from "axios";

import * as todos from "../To-do";
import constants from "../../constants";

jest.mock("axios");

describe("To-do services", () => {
  it("getAllTodos", async () => {
    await todos.getAllTodos();

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(constants.TODO_URL);
  });

  it("getTodo", async () => {
    await todos.getTodo("123");

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${constants.TODO_URL}/123`);
  });

  it("createTodo", async () => {
    const task = {
      title: "title",
      description: "description",
      status: "to-do",
    };
    await todos.createTodo(task);

    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(`${constants.TODO_URL}`, task);
  });

  it("updateTodo", async () => {
    const update = {
      _id: "123",
      title: "title",
      description: "description",
      status: "to-do",
    };
    await todos.updateTodo("123", update);

    expect(axios.patch).toHaveBeenCalled();
    expect(axios.patch).toHaveBeenCalledWith(
      `${constants.TODO_URL}/123`,
      update
    );
  });

  it("deleteTodo", async () => {
    await todos.deleteTodo("123");

    expect(axios.delete).toHaveBeenCalled();
    expect(axios.delete).toHaveBeenCalledWith(`${constants.TODO_URL}/123`);
  });
});
