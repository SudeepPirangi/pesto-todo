import { fireEvent, render, screen } from "@testing-library/react";

import Home from "..";
import * as todos from "../../../services/To-do";

jest.mock("../../../services/To-do");

describe("Home", () => {
  it("Should render Filter group", async () => {
    render(<Home />);

    expect(await screen.findByRole("group")).toBeInTheDocument();
    expect(screen.getByTestId("no-task")).toBeInTheDocument();
  });

  it("Should display Create Task dialog", async () => {
    render(<Home />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.queryByText("Create"));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("Should have ALL button pressed", async () => {
    render(<Home />);
    const activeButton = screen.getByRole("button", { pressed: true });
    expect(activeButton.textContent).toBe("All");
  });

  it("Should display todos as cards", async () => {
    todos.getAllTodos.mockImplementation(() => ({
      data: [
        {
          _id: 1,
          title: "first",
          description: "first description",
          status: "to-do",
        },
        {
          _id: 2,
          title: "second",
          description: "second description",
          status: "in-progress",
        },
        {
          _id: 3,
          title: "third",
          description: "third description",
          status: "done",
        },
      ],
    }));
    render(<Home />);
    await screen.findByTestId("task-list");
    // console.log("tasklist", screen.queryByText("first description").outerHTML);
    expect(todos.getAllTodos).toHaveBeenCalled();
    expect(todos.getAllTodos).toHaveBeenCalledTimes(1);
    expect(screen.getByText("first description")).toBeInTheDocument();
    expect(screen.getByText("second description")).toBeInTheDocument();
    expect(screen.getByText("third description")).toBeInTheDocument();
    expect(screen.queryByText("No Tasks to display")).not.toBeInTheDocument();
  });

  it("Should display only to-do item cards", async () => {
    todos.getAllTodos.mockImplementation(() => ({
      data: [
        {
          _id: 1,
          title: "first",
          description: "first description",
          status: "to-do",
        },
        {
          _id: 2,
          title: "second",
          description: "second description",
          status: "in-progress",
        },
        {
          _id: 3,
          title: "third",
          description: "third description",
          status: "done",
        },
      ],
    }));
    render(<Home />);
    await screen.findByTestId("task-list");

    expect(screen.getAllByRole("task")).toHaveLength(3);
    expect(screen.getByText("first description")).toBeInTheDocument();
    expect(screen.getByText("second description")).toBeInTheDocument();

    const todoFilterButton = screen.queryByText("To-Do");
    fireEvent.click(todoFilterButton);

    expect(await screen.findAllByRole("task")).toHaveLength(1);
    expect(screen.getByText("first description")).toBeInTheDocument();
    expect(screen.queryByText("second description")).not.toBeInTheDocument();
  });

  it("Should display only in-progress item cards", async () => {
    todos.getAllTodos.mockImplementation(() => ({
      data: [
        {
          _id: 1,
          title: "first",
          description: "first description",
          status: "to-do",
        },
        {
          _id: 2,
          title: "second",
          description: "second description",
          status: "in-progress",
        },
        {
          _id: 3,
          title: "third",
          description: "third description",
          status: "done",
        },
      ],
    }));
    render(<Home />);
    await screen.findByTestId("task-list");

    expect(screen.getAllByRole("task")).toHaveLength(3);
    expect(screen.getByText("first description")).toBeInTheDocument();
    expect(screen.getByText("second description")).toBeInTheDocument();

    const inProgressFilterButton = screen.queryAllByText("In Progress")[0];
    fireEvent.click(inProgressFilterButton);

    expect(await screen.findAllByRole("task")).toHaveLength(1);
    expect(screen.getByText("second description")).toBeInTheDocument();
    expect(screen.queryByText("first description")).not.toBeInTheDocument();
  });

  it("Should display only done item cards", async () => {
    todos.getAllTodos.mockImplementation(() => ({
      data: [
        {
          _id: 1,
          title: "first",
          description: "first description",
          status: "to-do",
        },
        {
          _id: 2,
          title: "second",
          description: "second description",
          status: "in-progress",
        },
        {
          _id: 3,
          title: "third",
          description: "third description",
          status: "done",
        },
      ],
    }));
    render(<Home />);
    await screen.findByTestId("task-list");

    expect(screen.getAllByRole("task")).toHaveLength(3);
    expect(screen.getByText("first description")).toBeInTheDocument();
    expect(screen.getByText("second description")).toBeInTheDocument();

    const doneFilterButton = screen.queryAllByText("Done")[0];
    fireEvent.click(doneFilterButton);

    expect(await screen.findAllByRole("task")).toHaveLength(1);
    expect(screen.getByText("third description")).toBeInTheDocument();
    expect(screen.queryByText("first description")).not.toBeInTheDocument();
  });
});
