import { Router } from "express"
import { ProductsController } from "../controllers/productsController.js"
import { checkLogin } from "../middlewares/checkLogin.js"
import { handleImage } from "../middlewares/handleImage.js"

export function productsRouter ({ model }) {
  const productsRouter = Router()
  const productsController = new ProductsController({ model })

  productsRouter.get("/", productsController.getAllProducts)
  productsRouter.get("/user-products", checkLogin(), productsController.getUserProducts)
  productsRouter.post("/add-product", checkLogin(), handleImage(), productsController.addProduct)

  return productsRouter
}