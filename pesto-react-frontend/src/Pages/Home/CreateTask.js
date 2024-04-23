import React, { useEffect, useState } from "react";
import _ from "lodash";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import constants from "../../constants";

const { STATUS, STATUS_VALUES: VALS } = constants;

const CreateTask = ({
  open,
  selectedTask,
  handleDialogClose,
  handleCreateTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(VALS.TO_DO);

  const setAllStates = (task) => {
    setTitle(_.get(task, "title", ""));
    setDescription(_.get(task, "description", ""));
    setStatus(_.get(task, "status", VALS.TO_DO));
  };

  useEffect(() => {
    setAllStates(selectedTask);
  }, [selectedTask]);

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          handleCreateTask({ ...formJson, _id: selectedTask?._id });
          setAllStates(null);
        },
      }}
    >
      <DialogTitle>{selectedTask ? "Edit" : "Create"} Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details to {selectedTask ? "edit" : "create"} a
          Task.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="new-title"
          name="title"
          label="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          style={{ marginTop: "15px" }}
          fullWidth
        />
        <TextField
          id="new-description"
          label="Description"
          name="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          multiline
          fullWidth
          style={{ marginTop: "15px" }}
          rows={2}
        />
        <FormControl fullWidth style={{ marginTop: "15px" }}>
          <InputLabel id="new-status-label">Status</InputLabel>
          <Select
            labelId="new-status-label"
            id="new-status"
            name="status"
            value={status}
            onChange={(ev) => setStatus(ev.target.value)}
            label="Status"
          >
            <MenuItem value={VALS.TO_DO}>{STATUS.TO_DO}</MenuItem>
            <MenuItem value={VALS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</MenuItem>
            <MenuItem value={VALS.DONE}>{STATUS.DONE}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button type="submit">
          {selectedTask ? "Edit Task" : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTask;
