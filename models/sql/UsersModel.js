import mysql from "mysql2/promise"
import jwt from "jsonwebtoken"
import crypto from "node:crypto"
import { ValidationError } from "../../utils/errors.js"
import { validateUser } from "../../schemas/User.js"

const SECRET_KEY = "SECREY_KEY_HERe!"

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mirkito18",
  database: "store"
})


export class UsersModel {
  static registerUser = async ({ username, password }) => {
    const userId = crypto.randomUUID()
    if (!username || !password) {
      return { success: false, error: new ValidationError("Invalid request") }
    }
    const shopName = `Tienda de ${username}`
    const shopId = crypto.randomUUID()
    let token
    try {
      await connection.execute(
        'INSERT INTO users (id, username, password) ' +
        'VALUES (UUID_TO_BIN(?), ?, ?); ',
        [userId, username, password]
      )
      await connection.execute(
        'INSERT INTO shops (shop_name, shop_owner, shop_id) ' +
        'VALUES (?, UUID_TO_BIN(?), UUID_TO_BIN(?))',
        [shopName, userId, shopId]
      )
      token = jwt.sign({ id:userId, username, shopId }, SECRET_KEY)
    } catch (e) {
      return { success: false, error: e }
    }

    return { success: true, data: token }
  }

  static loginUser = async ({ username, password }) => {
    const validation = await validateUser({ username, password })
    if (!validation.success) return { success: false, error: new ValidationError(validation.error.message) }

    let token
    try {
      const result = await connection.execute(
        'SELECT BIN_TO_UUID(id) AS id, username, BIN_TO_UUID(shop_id) AS shopId FROM users ' +
        'INNER JOIN shops ON shops.shop_owner = users.id ' +
        'WHERE username = ? AND password = ?',
        [username, password]
      )
      if (result[0].length === 0) {
        return { success: false, error: new ValidationError("User not found") }
      }
      const userData = result[0][0]
      token = jwt.sign(userData, SECRET_KEY)

    } catch (e) {
      return { success: false, error: e }
    }

    return { success: true, data: token }
  }
}

export async function finishUsersConnection () {
  await connection.end()
  return "off"
}