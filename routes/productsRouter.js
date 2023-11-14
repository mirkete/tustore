import { Router } from "express"
import { ProductsController } from "../controllers/productsController.js"

export function productsRouter ({ model }) {
  const productsRouter = Router()
  const productsController = new ProductsController({ model })

  productsRouter.get("/", productsController.getAllProducts)
  productsRouter.get("/:storeId", productsController.getStoreProducts)

  return productsRouter
}