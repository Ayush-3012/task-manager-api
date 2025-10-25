import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { deleteTask, getAllTask } from "../controllers/task.controller.js";
import { deleteUser, getAllUsers } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/users").get(verifyToken, isAdmin, getAllUsers); // get all users
adminRouter.route("/tasks").get(verifyToken, isAdmin, getAllTask); // get all tasks
adminRouter.route("/delete/:id").delete(verifyToken, isAdmin, deleteUser); // delete user
adminRouter.route("/delete/task/:id").delete(verifyToken, isAdmin, deleteTask); // delete task of any user

export default adminRouter;
