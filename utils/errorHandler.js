const errorsResponses = {
  ValidationError: (res, message) => {
    res.status(400).json({ error: message })
  },
  JsonWebTokenError: (res, message) => {
    res.status(401).json({ error: message })
  },
  DatabaseError: (res, message) => {
    res.status(500).json({ error: "Unexpected error" })
  },
  DefaultError: (res, message) => {
    res.status(500).json({ error: "Unexpected error" })
  }
}

function errorHandler ({ error, res }) {
  const errorResponse = errorsResponses[error.name] ?? errorsResponses["DefaultError"]
  return errorResponse(res, error.name)
}

export { errorHandler }