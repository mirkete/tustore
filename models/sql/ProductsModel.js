import mysql from "mysql2/promise"
import { DatabaseError } from "../../utils/errors.js"

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mirkito18",
  database: "store"
})

export class ProductsModel {

  static getAllProducts = async () => {
    let result
    try {
      result = await connection.execute(
        'SELECT BIN_TO_UUID(product_id) AS product_id, ' +
        'product_name, BIN_TO_UUID(product_shop) AS product_shop, ' +
        'product_price, product_image FROM products ' +
        'LIMIT 10'
      )
    } catch (error) {
      return { success: false, error: new DatabaseError(error) }
    }

    return { success: true, data: result[0] }
  }

  static getStoreProducts = async (storeId) => {
    let result
    try {
      result = await connection.execute(
        'SELECT BIN_TO_UUID(product_id) AS product_id, product_name, BIN_TO_UUID(product_shop) AS product_shop, product_price FROM products ' +
        'WHERE UUID_TO_BIN(?) = product_shop',
        [storeId]
      )
    } catch (error) {
      return { success: false, error: new DatabaseError(error) }
    }

    return { success: true, data: result[0] }
  }

  static getUserProducts = async (userId) => {
    let result
    try {
      result = await connection.execute(
        'SELECT shop_name, product_name, product_price FROM shops ' +
        'INNER JOIN products ON products.product_shop = shops.shop_id ',
        'WHERE BIN_TO_UUID(shop_owner) = ?'
        [userId]
      )
    } catch (error) {
      return { success: false, error }
    }

    return { success: true, data: result[0] }
  }
}