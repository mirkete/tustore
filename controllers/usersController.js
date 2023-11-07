import { errorHandler } from "../utils/errorHandler.js"

export class UsersController {
  constructor({ model }) {
    this.model = model
  }

  registerUser = async (req, res) => {
    const result = await this.model.registerUser(req.body)

    if (!result.success) return errorHandler({ error: result.error, res })

    res.status(201).send(result.data)
  }

  loginUser = async (req, res) => {
    const result = await this.model.loginUser(req.body)

    if (!result.success) return errorHandler({ error: result.error, res })

    res.status(200).send(result.data)
  }
}