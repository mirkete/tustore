const SECREY_KEY = "SECREY_KEY_HERe!"
import jwt from "jsonwebtoken"

export class UsersModel {
  static registerUser = (user) => {
    if (!user["username"] || !user["password"]) {
      return { success: false, error: "InvalidRequest" }
    }

    const token = jwt.sign(user, SECREY_KEY)

    return { success: true, data: token }
  }
}