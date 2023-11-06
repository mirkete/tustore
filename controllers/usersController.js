export class UsersController {
  constructor({ model }) {
    this.model = model
  }

  registerUser = async (req, res) => {
    const result = await this.model.registerUser(req.body)

    if (!result.success) return res.status(500).send(result.error)

    res.status(201).send(result.data)
  }
}