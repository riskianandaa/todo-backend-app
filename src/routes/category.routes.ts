import express from "express"
import { createCategories, deleteCategory, getAllCategories, updateCategory } from "../controllers/category.controller"
import { authenticationMiddleware } from "../middleware"

const categoryRoutes = express.Router()

categoryRoutes.use(authenticationMiddleware)

categoryRoutes.route("/").get(getAllCategories)
categoryRoutes.route("/create").post(createCategories)
categoryRoutes.route("/:id").delete(deleteCategory)
categoryRoutes.route("/update").put(updateCategory)

export default categoryRoutes