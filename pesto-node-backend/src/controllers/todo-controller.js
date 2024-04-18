const welcome = (req, res) => {
  res.send("Hey You!");
};

const getAllTodos = (req, res) => {
  res.send("Get all todos");
};

const getTodo = (req, res) => {
  const id = req.params.id;
  res.send(`Get Todo ${id}`);
};

const createTodo = (req, res) => {
  res.send("Create Todo");
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  res.send(`Update Todo ${id}`);
};

const deleteTodo = (req, res) => {
  const id = req.params.id;
  res.send(`Delete Todo ${id}`);
};

module.exports = {
  welcome,
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
