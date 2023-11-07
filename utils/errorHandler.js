import { ValidationError } from "./errors.js"

const errorsResponses = {
  ValidationError: (res, message) => {
    res.status(400).json({ error: message })
  },
  JsonWebTokenError: (res, message) => {
    res.status(401).json({ error: message })
  },
  DefaultError: (res, message) => {
    res.status(500).json({ error: message })
  }
}

function errorHandler ({ error, res }) {

  if (error instanceof ValidationError) return errorsResponses[error.name](res, error.message)
  if (error.name === "JsonWebTokenError") return errorsResponses[error.name](res, error.message)

  return errorsResponses["DefaultError"]
}

export { errorHandler }