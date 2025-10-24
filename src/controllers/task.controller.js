import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, priority } = req.body;

    if (!title || !dueDate)
      return res.status(404).json({ message: "Details missing" });

    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      priority,
      creator: req.user,
    });
    await newTask.save();

    return res.status(201).json({ message: "Task Created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const allTasks = await Task.find({});

    return res.status(200).json(allTasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const foundTask = await Task.findById(req.query.id);
    if (!foundTask) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(foundTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updates = req.body;
    const foundTask = await Task.findById(req.query.id);
    if (!foundTask) return res.status(404).json({ message: "Task not found" });

    const userId = req.user;

    if (foundTask.creator.toString() !== userId.toString())
      return res
        .status(401)
        .json({ message: "Not authorized to update this task" });

    await Task.findByIdAndUpdate(req.query.id, updates);
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const foundTask = await Task.findById(req.query.id);
    if (!foundTask) return res.status(404).json({ message: "Task not found" });

    const userId = req.user;

    if (foundTask.creator.toString() !== userId.toString())
      return res
        .status(401)
        .json({ message: "Not authorized to delete this task" });

    await Task.findByIdAndDelete(req.query.id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
