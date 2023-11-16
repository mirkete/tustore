import { Router } from "express"
import { join } from "path"
import { UsersController } from "../controllers/usersController.js"
import { checkLogin } from "../middlewares/checkLogin.js"

export function mainRouter ({ model }) {
  const mainRouter = Router()
  const usersController = new UsersController({ model })

  mainRouter.get("/", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "home.html"))
  })

  mainRouter.get("/login", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "login.html"))
  })

  mainRouter.post("/login", usersController.loginUser)

  mainRouter.get("/register", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "register.html"))
  })

  mainRouter.get("/catalogo", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "catalogo.html"))
  })

  //PRIVATE URLS
  mainRouter.get("/user-data", checkLogin(), (req, res) => {
    res.status(200).json(req.user)
  })


  mainRouter.get("/commerce", (req, res) => {
    res.sendFile(join(process.cwd(), "web", "products.html"))
  })


  mainRouter.post("/register", usersController.registerUser)

  return mainRouter
}