import Errorhandler from "../middlewares/error.js";
import { Task } from "../model/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(200).json({
      success: true,
      message: "Task Add Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const task = await Task.find({ user: userId });
    if (!task) return next(new Errorhandler("Invalid Id", 404));
    res.status(200).json({
      success: true,
      message: "Fetched All Task Successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new Errorhandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new Errorhandler("Invalid Id", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Delete Successfully",
      data: task,
    });
  } catch (error) {
    next();
  }
};
