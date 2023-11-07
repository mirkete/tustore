const SECREY_KEY = "SECREY_KEY_HERe!"
import jwt from "jsonwebtoken"
import fs from "node:fs/promises"

const dbData = await fs.readFile(process.cwd() + "/models/test/test_db.json", { encoding: "utf-8" })
const db = JSON.parse(dbData)

export class UsersModel {
  static registerUser = async ({ username, password }) => {
    if (!username || !password) {
      return { success: false, error: "InvalidRequest" }
    }

    let token
    try {
      token = jwt.sign({ username, password }, SECREY_KEY)
      db.push({ username, password })
      await fs.writeFile(process.cwd() + "/models/test/test_db.json", JSON.stringify(db))
    } catch (e) {
      return { success: false, error: e }
    }

    return { success: true, data: token }
  }

  static loginUser = ({ username, password }) => {
    if (!username || !password) {
      return { success: false, error: "InvalidRequest" }
    }

    const userFound = db.find((el) => el.username === username && el.password === password)
    if (!userFound) {
      return { success: false, error: "UserNotFound" }
    }

    let token
    try {
      token = jwt.sign({ username, password }, SECREY_KEY)
    } catch (e) {
      return { success: false, error: e }
    }

    return { success: true, data: token }
  }
}