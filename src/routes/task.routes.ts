import express from 'express'
import { authenticationMiddleware } from '../middleware'
import { createTask, deleteTask, editTask, getAllCompletedTask, getAllTaskByCategory, getAllTasks, getTaskForToday, toggleTaskStatus } from '../controllers/task.controller'

const taskRoutes = express.Router()

taskRoutes.use(authenticationMiddleware)

taskRoutes.route("/").get(getAllTasks)
taskRoutes.route("/task-by-categories/:id").get(getAllTaskByCategory)
taskRoutes.route("/completed").get(getAllCompletedTask)
taskRoutes.route("/today").get(getTaskForToday)
taskRoutes.route("/create").post(createTask)
taskRoutes.route("/:id").delete(deleteTask)
taskRoutes.route("/update/:id").put(toggleTaskStatus)
taskRoutes.route("/edit/:id").put(editTask)

export default taskRoutes
