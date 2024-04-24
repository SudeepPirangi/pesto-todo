import { fireEvent, render, screen, within } from "@testing-library/react";

import CreateTask from "../CreateTask";

describe("CreateTask", () => {
  it("Should display all the input fields", () => {
    render(<CreateTask open={true} />);

    const title = screen.getByTestId("new-title");
    const description = screen.getByTestId("new-description");
    const status = screen.getByTestId("new-status");

    expect(screen.getByRole("heading").innerHTML).toEqual("Create Task");
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });

  it("Should change input fields", async () => {
    render(<CreateTask open={true} />);

    const title = screen.getAllByRole("textbox")[0];
    const description = screen.getAllByRole("textbox")[1];
    const status = screen.getByLabelText("Status");

    fireEvent.change(title, { target: { value: "First" } });
    fireEvent.change(description, { target: { value: "First description" } });

    fireEvent.mouseDown(status);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/in progress/i));

    expect(screen.getAllByRole("textbox")[0].value).toEqual("First");
    expect(screen.getAllByRole("textbox")[1].value).toEqual(
      "First description"
    );
    expect(status.innerHTML).toEqual("In Progress");
  });

  it("Should submit form", async () => {
    const handleCreateTask = jest.fn();
    render(<CreateTask open={true} handleCreateTask={handleCreateTask} />);

    const title = screen.getAllByRole("textbox")[0];
    const description = screen.getAllByRole("textbox")[1];
    const status = screen.getByLabelText("Status");

    fireEvent.change(title, { target: { value: "First" } });
    fireEvent.change(description, { target: { value: "First description" } });

    fireEvent.mouseDown(status);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/in progress/i));

    const submit = screen.getAllByRole("button")[1];
    fireEvent.click(submit);

    expect(handleCreateTask).toHaveBeenCalled();
    expect(handleCreateTask).toHaveBeenCalledWith({
      title: "First",
      description: "First description",
      status: "in-progress",
    });
  });

  it("Should behave as edit dialog", async () => {
    const handleCreateTask = jest.fn();
    const selectedTask = {
      _id: 123,
      title: "First",
      description: "First description",
      status: "in-progress",
    };

    render(
      <CreateTask
        open={true}
        selectedTask={selectedTask}
        handleCreateTask={handleCreateTask}
      />
    );

    const [title, description] = await screen.findAllByRole("textbox");
    const status = await screen.findByLabelText("Status");

    expect(screen.getByRole("heading").innerHTML).toEqual("Edit Task");
    expect(title.value).toEqual("First");
    expect(description.value).toEqual("First description");
    expect(status.innerHTML).toEqual("In Progress");

    fireEvent.change(description, { target: { value: "First only" } });

    const submit = screen.getAllByRole("button")[1];
    fireEvent.click(submit);

    expect(handleCreateTask).toHaveBeenCalled();
    expect(handleCreateTask).toHaveBeenCalledWith({
      _id: 123,
      title: "First",
      description: "First only",
      status: "in-progress",
    });
  });
});
