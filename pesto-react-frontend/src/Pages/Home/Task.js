import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import constants from "../../constants";
import "./Task.css";
import { transformStatus } from "./utils";

const { STATUS } = constants;

export const statuses = [
  {
    value: 0,
    label: STATUS.TO_DO,
  },
  {
    value: 1,
    label: STATUS.IN_PROGRESS,
  },
  {
    value: 2,
    label: STATUS.DONE,
  },
];

const Task = ({ task, onEditTask, onDeleteTask }) => {
  if (!task) return null;
  const updatedTask = transformStatus(task);
  return (
    <Card sx={{ minWidth: 275 }} className="task" role="task">
      <CardContent className="card-content">
        <div className="titleAndDelete">
          <Typography variant="h5" component="div">
            {updatedTask.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              color="success"
              aria-label="Edit To-do"
              onClick={() => onEditTask(task)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              aria-label="Delete To-do"
              onClick={() => onDeleteTask(task._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </div>
        <Typography className="description" color="text.secondary">
          {updatedTask.description}
        </Typography>
        <Box className="slider">
          <Slider
            aria-label="Status"
            defaultValue={0}
            value={updatedTask.value || 0}
            step={1}
            marks={statuses}
            min={0}
            max={2}
            color={updatedTask.color}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Task;
