import jwt from "jsonwebtoken"
import { ValidationError } from "../utils/errors.js"
import { errorHandler } from "../utils/errorHandler.js"

const SECREY_KEY = "SECREY_KEY_HERe!"

function checkLogin () {
  return (req, res, next) => {
    let userToken = req.get("Authorization")
    userToken = userToken.split(" ")[1]

    let userData
    try {
      userData = jwt.verify(userToken, SECREY_KEY)
    } catch (e) {
      return errorHandler({ res, error: new ValidationError("UNAUTHORIZED") })
    }

    req.user = { username: userData.username }
    next()
  }
}

export { checkLogin }