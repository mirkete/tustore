import { Router } from "express"
import { join } from "path"
import { UsersController } from "../controllers/usersController.js"

export function mainRouter ({ model }) {
  const mainRouter = Router()
  const usersController = new UsersController({ model })

  mainRouter.get("/", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "home.html"))
  })

  mainRouter.get("/register", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "register.html"))
  })

  mainRouter.post("/register", usersController.registerUser)

  mainRouter.get("/login", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "login.html"))
  })

  return mainRouter
}