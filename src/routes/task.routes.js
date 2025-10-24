import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter.route("/").post(verifyToken, createTask); // create new task
taskRouter.route("/").get(verifyToken, getAllTask); // get all tasks
taskRouter.route("/:id").get(verifyToken, getTaskById); // get single task
taskRouter.route("/:id").put(verifyToken, updateTask); // update the task
taskRouter.route("/:id").delete(verifyToken, deleteTask); // delete the task

export default taskRouter;
