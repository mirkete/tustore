import mysql from "mysql2/promise"
import jwt from "jsonwebtoken"
import { ValidationError } from "../../utils/errors.js"

const SECRET_KEY = "SECREY_KEY_HERe!"

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mirkito18",
  database: "store"
})


export class UsersModel {
  static registerUser = async ({ username, password }) => {
    if (!username || !password) {
      return { success: false, error: new ValidationError("Invalid request") }
    }
    let token
    try {
      await connection.execute(
        'INSERT INTO users (username, password) ' +
        'VALUES (?, ?)',
        [username, password]
      )
      token = jwt.sign({ username, password }, SECRET_KEY)
    } catch (e) {
      return { success: false, error: e }
    }

    return { success: true, data: token }
  }

  static loginUser = async ({ username, password }) => {
    if (!username || !password) {
      return { success: false, error: new ValidationError("Invalid request") }
    }

    let token
    try {
      const result = await connection.execute(
        'SELECT username, password FROM users ' +
        'WHERE username = ? AND password = ?',
        [username, password]
      )
      if (result[0].length === 0) {
        return { success: false, error: new ValidationError("User not found") }
      }
      token = jwt.sign({ username, password }, SECRET_KEY)

    } catch (e) {
      return { success: false, error: e }
    }

    return { success: true, data: token }
  }
}