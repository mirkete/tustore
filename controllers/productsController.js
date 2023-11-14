import { errorHandler } from "../utils/errorHandler.js"

export class ProductsController {
  constructor({ model }) {
    this.model = model
  }

  getAllProducts = async (req, res) => {
    const result = await this.model.getAllProducts()

    if (!result.success) return errorHandler({ error: result.error, res })

    res.status(200).json(result.data)
  }

  getStoreProducts = async (req, res) => {
    const { storeId } = req.params
    const result = await this.model.getStoreProducts(storeId)
    if (!result.success) return errorHandler({ error: result.error, res })

    return res.status(200).json(result.data)
  }
}