import React, { useEffect, useState } from "react";
import _ from "lodash";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../../services/To-do";
import CreateTask from "./CreateTask";
import Task from "./Task";
import { getFilterLabel, statusColor } from "./utils";
import "./Home.css";

export default function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [errors, setErrors] = useState("");
  const [open, setOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const { data } = await getAllTodos();
      setTasks(data);
      if (filter === "all") {
        setFilteredTasks(data);
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleCreateTask = async (formJson) => {
    try {
      if (formJson._id) {
        // Edit the task
        await updateTodo(formJson._id, formJson);
      } else {
        // Create a new task
        await createTodo(formJson);
      }
      fetchTasks();
    } catch (error) {
      setErrors(error.message);
    } finally {
      setSelectedTask(null);
      handleDialogClose();
    }
  };

  const onCreateTask = () => {
    setSelectedTask(null);
    handleDialogOpen();
  };
  const onEditTask = (task) => {
    setSelectedTask(task);
    handleDialogOpen();
  };
  const onDeleteTask = async (taskId) => {
    try {
      if (taskId) {
        await deleteTodo(taskId);
        fetchTasks();
      } else {
        throw new Error("Delete cannot be performed");
      }
    } catch (error) {
      setErrors(error.message);
    } finally {
      handleDialogClose();
    }
  };

  const filterChange = (event, newFilter) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(_.filter(tasks, (task) => task.status === newFilter));
    }
  };

  return (
    <Grid item xs={12} sm={10} md={6} className="home">
      <h1>
        List of
        <Typography className="filter-key" color={statusColor(filter)}>
          {` ${getFilterLabel(filter)} `}
        </Typography>
        items
      </h1>

      <div className="interactions">
        <ToggleButtonGroup
          size="small"
          color={statusColor(filter)}
          value={filter}
          exclusive
          onChange={filterChange}
          aria-label="Todos Filter"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="to-do">To-Do</ToggleButton>
          <ToggleButton value="in-progress">In Progress</ToggleButton>
          <ToggleButton value="done">Done</ToggleButton>
        </ToggleButtonGroup>

        <Fab
          variant="extended"
          size="small"
          color="success"
          aria-label="create to-do item"
          onClick={onCreateTask}
        >
          <AddIcon sx={{ mr: 1 }} /> Create
        </Fab>
      </div>

      {errors && (
        <Alert severity="error" className="error-alert">
          {errors}
        </Alert>
      )}

      <Box sx={{ my: 2 }}>
        {!!filteredTasks.length ? (
          filteredTasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              handleDialogOpen={handleDialogOpen}
            />
          ))
        ) : (
          <h1>No Tasks to display</h1>
        )}
      </Box>

      <CreateTask
        open={open}
        selectedTask={selectedTask}
        handleDialogClose={handleDialogClose}
        handleCreateTask={handleCreateTask}
      />
    </Grid>
  );
}
