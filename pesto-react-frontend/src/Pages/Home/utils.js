import constants from "../../constants";

const { STATUS, STATUS_VALUES: VALS } = constants;

export const getFilterLabel = (filter) => {
  switch (filter) {
    case "all":
      return "All";
    case VALS.TO_DO:
      return STATUS.TO_DO;
    case VALS.IN_PROGRESS:
      return STATUS.IN_PROGRESS;
    case VALS.DONE:
      return STATUS.DONE;
    default:
      return "All";
  }
};

export const statusColor = (status) => {
  switch (status) {
    case VALS.TO_DO:
      return "error";
    case VALS.IN_PROGRESS:
      return "warning";
    case VALS.DONE:
      return "success";
    default:
      return "primary";
  }
};

export const transformStatus = (task) => {
  switch (task.status) {
    case VALS.TO_DO:
      return { ...task, value: 0, color: "error" };
    case VALS.IN_PROGRESS:
      return { ...task, value: 1, color: "warning" };
    case VALS.DONE:
      return { ...task, value: 2, color: "success" };
    default:
      return { ...task, value: 0, color: "error" };
  }
};
