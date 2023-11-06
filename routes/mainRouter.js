import { Router } from "express"
import { join } from "path"

export function mainRouter () {
  const mainRouter = Router()

  mainRouter.get("/", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "home.html"))
  })

  mainRouter.get("/register", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "register.html"))
  })

  mainRouter.get("/login", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "login.html"))
  })

  return mainRouter
}