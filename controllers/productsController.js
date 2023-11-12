export class ProductsController {
  constructor({ model }) {
    this.model = model
  }

  getAllProducts = async (req, res) => {
    const result = await this.model.getAllProducts()

    if (!result.success) return res.status(500).send("Error here")

    res.status(200).json(result.data)
  }
}