/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from "@testing-library/react";

import Task from "../Task";

describe("Task", () => {
  const task = {
    _id: 123,
    title: "First",
    description: "First description",
    status: "in-progress",
  };

  it("should not display card", () => {
    render(<Task />);
    expect(screen.queryByRole("task")).not.toBeInTheDocument();
  });

  it("should display all task properties in a card", () => {
    render(<Task task={task} />);

    const card = screen.getByRole("task");
    const title = card.querySelector("div.titleAndDelete > div");
    const description = card.querySelector("p");
    const status = card.querySelector("input");

    expect(card).toBeInTheDocument();
    expect(title.innerHTML).toEqual(task.title);
    expect(description.innerHTML).toEqual(task.description);
    expect(status.value).toEqual("1");
  });

  it("should trigger edit task", () => {
    const onEditTask = jest.fn();
    render(<Task task={task} onEditTask={onEditTask} />);

    const edit = screen.getAllByRole("button")[0];

    fireEvent.click(edit);

    expect(onEditTask).toHaveBeenCalled();
    expect(onEditTask).toHaveBeenCalledWith(task);
  });

  it("should trigger delete task", () => {
    const onDeleteTask = jest.fn();
    render(<Task task={task} onDeleteTask={onDeleteTask} />);

    const deleteButton = screen.getAllByRole("button")[1];

    fireEvent.click(deleteButton);

    expect(onDeleteTask).toHaveBeenCalled();
    expect(onDeleteTask).toHaveBeenCalledWith(task._id);
  });
});
