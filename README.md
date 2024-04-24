# pesto-todo App
## Overview
This repo consists of `Node.js` backend and `React.js` frontend apps these are seperated into their own folders as:
- Backend - `pesto-node-backend`
- Frontend - `pesto-react-frontend`

For the To-do app to work, you need to run both backend and frontend simultaneously, so that, the api calls from frontend reach backend and receive data from Mongo Cloud Database.

## How to run backend?
1. First, you need to navigate to `pesto-node-backend` folder and then run `npm install` to install all the dependencies.

```
npm install
```
2. Once the installation is complete, you need to run one of the below commands.
```
npm start # to run server normally
npm run dev # to run server in watch mode
```
3. With above commands, the backend runs locally on 
```
http://localhost:3200
```
4. You can configure the port number(`3200`) to anything that your computer supports. This configuration can be set in `.env` file of the backend's root folder.
5. A `.env.example` file has been left for your reference so that you know what environment variables are being used in the app.
6. As the server starts, the app pulls **MongoDB** environment variables from `.env` file and connects to **MongoDB Atlas** which is a cloud database.
7. To run unit tests, you will have run the below command.
```
npm run test
```

## Endpoint, Methods and Payload

1. Get All To-dos
```
endpoint: http://localhost:3200/todos
method: GET
payload: none
response: An array of task objects
```
2. Get a single To-do
```
endpoint: http://localhost:3200/todos/:taskId
method: GET
payload: none
response: A task object
```
3. Create a To-do
```
endpoint: http://localhost:3200/todos
method: POST
payload: {
  title: 'task title',
  description: 'task description',
  status: 'to-do || in-progress || done'
}
response: A newly created task object with _id
```
4. Update a To-do
```
endpoint: http://localhost:3200/todos/:taskId
method: PATCH
payload: {
  title: 'task title',
  description: 'task description',
  status: 'to-do || in-progress || done'
} // any or all of the above if updated
response: An updated task object with _id
```
5. Delete a to-do
```
endpoint: http://localhost:3200/todos/:taskId
method: DELETE
payload: none
response: Optional Acknowledgement
```

## How to run frontend?

Running a frontend app would be more simpler.

1. Navigate to `pesto-react-frontend`
2. Run the below command to install frontend dependencies.
```
npm install
```
3. Start the server.
```
npm start
```
4. Frontend server would be running on 
```
http://localhost:3000
```
5. To run the unit tests, you need to run the below command.
```
npm run test
```

## How to use frontend?
1. When app launches for the first time you would only find a buttons group along with a **+ Create** button.
2. Click on the **Create** button to open a dialog in which you can enter details of a task to be added to To-do list.
3. Every task would contain button to **Edit** and **Delete** the task.
4. The status slider of the tasks are color coded depending on the task status.
5. Additionally, you can make use of the buttons **(All, To-Do, In Progress, Done)** in the buttons group to filter the todo list based on their status.