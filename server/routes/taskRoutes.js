const express = require('express');
const taskRouter = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

taskRouter.use(auth); // Protect all task routes

taskRouter.get('/', getTasks);
taskRouter.post('/', createTask);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

module.exports = taskRouter;