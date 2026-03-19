const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const { title, description, category, deadline } = req.body;
    const newTask = new Task({ user: req.user, title, description, category, deadline });
    await newTask.save();
    res.status(201).json(newTask);
};

exports.updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user },
        req.body,
        { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
};