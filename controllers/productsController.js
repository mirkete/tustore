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

  getUserProducts = async (req, res) => {
    const { id } = req.user
    const result = await this.model.getUserProducts(id)

    if (!result.success) return errorHandler({ error: result.error, res })

    return res.status(200).json(result.data)
  }

  addProduct = async (req, res) => {
    //req.file contains file info (including file buffer)
    const { shopId } = req.user
    const result = await this.model.addProduct(req.body, shopId)
    if (!result.success) return errorHandler({ error: result.error, res })

    res.status(201).json(result.data)
  }
}