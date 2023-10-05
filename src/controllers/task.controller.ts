import { Request, Response } from "express"
import Task from "../models/task-model"
import { AuthRequest } from "../middleware"
import { ITask } from "../types"

export const getAllTasks = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.user
    const tasks = await Task.find({
      user: userId
    })
    response.send(tasks)
  } catch (error) {
    console.log("error in getALlTasks", error)
    response.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const getAllTaskByCategory = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.user
    const { id } = request.params
    const tasks = await Task.find({
      user: userId,
      categoryId: id
    })
    response.send(tasks)
  } catch (error) {
    console.log("error in getAllTaskByCategory", error)
    response.send({ error: "Error while fetching tasks" })
    throw error
  }
}

export const getAllCompletedTask = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.user
    const tasks = await Task.find({
      user: userId,
      isCompleted: true
    })
    response.send(tasks)
  } catch (error) {
    console.log("error in getAllCompletedTask", error)
    response.send({ error: "Error while getAllCompletedTask" })
    throw error
  }
}

export const getTaskForToday = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.user
    const todaysISODate = new Date()
    todaysISODate.setHours(0, 0, 0, 0)

    const tasks = await Task.find({
      user: userId,
      date: todaysISODate.toISOString(),
    })
    response.send(tasks)
  } catch (error) {
    console.log("error in getTaskForToday", error)
    response.send({ error: "Error while getTaskForToday" })
    throw error
  }
}

export const createTask = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.user
    const { name, date, categoryId }: ITask = request.body
    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId
    })
    response.send(task)
  } catch (error) {
    console.log("error createTask")
    response.send({ error: "Error while creating task" })
    throw error
  }
}

export const toggleTaskStatus = async (request: AuthRequest, response: Response) => {
  try {
    const { isCompleted } = request.body
    const { id } = request.params

    const task = await Task.updateOne(
      {
        _id: id
      },
      {
        isCompleted
      }
    )
    response.send({ message: "Task status updated" })
  } catch (error) {
    console.log("error in toggleTaskStatus", error)
    response.send({ error: "Error while toggling status task" })
    throw error
  }
}

export const deleteTask = async (request: AuthRequest, response: Response) => {
  try {
    const { id } = request.params
    await Task.deleteOne({
      _id: id
    })
    response.send({ message: "Task deleted" })
  } catch (error) {
    console.log("error in deleteTask", error)
    response.send({ error: "Error while deleting task" })
    throw error
  }
}

export const editTask = async (request: AuthRequest, response: Response) => {
  try {
    const { _id, categoryId, date, name }: ITask = request.body
    const { id } = request.params

    await Task.updateOne(
      {
        _id: id
      },
      {
        $set: {
          name,
          categoryId,
          date,
        }
      }
    )
    response.send({ message: "Task updated successfully" })
  } catch (error) {
    console.log("error in editTask", error)
    response.send({ error: "Error while updating the task" })
    throw error
  }
}
