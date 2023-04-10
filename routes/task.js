import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  updateTask,
} from "../controller/task.js";
import { isAuthenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticate, newTask);
router.get("/my", isAuthenticate, getMyTask);
router
  .route("/:id")
  .put(isAuthenticate, updateTask)
  .delete(isAuthenticate, deleteTask);

export default router;
