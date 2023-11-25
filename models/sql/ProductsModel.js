import mysql from "mysql2/promise"
import { uploadImage } from "../../cloud/firebaseUploader.js"
import { DatabaseError, ValidationError } from "../../utils/errors.js"
import { validateProduct } from "../../schemas/Product.js"
import crypto from "node:crypto"

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mirkito18",
  database: "store"
})

const SECRET_KEY = "SECREY_KEY_HERe!"

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
        'INNER JOIN products ON products.product_shop = shops.shop_id ' +
        'WHERE BIN_TO_UUID(shop_owner) = ?',
        [userId]
      )
    } catch (error) {
      return { success: false, error: new DatabaseError("DATABASE ERROR. TRY AGAIN LATER.") }
    }

    return { success: true, data: result[0] }
  }

  static addProduct = async (productData, shopId, image) => {
    const productId = crypto.randomUUID() 
    const product = {
      ...productData, 
      id: productId
    }
    const validationResult = await validateProduct(product)
    if (!validationResult.success) {
      return { success: false, error: validationResult.error }
    }
    
    if(!image) return {success: false, error: new ValidationError("Invalid image type. It should be JPG/PNG")}
    const imageUpload = await uploadImage(image, {shopId, productId})
    const imageURL = imageUpload.url ?? "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg" 

    const { name, price, id } = validationResult.data
    try {
      await connection.execute(
        'INSERT INTO products (product_id, product_name, product_price, product_shop, product_image) ' +
        'VALUES (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?), ?)',
        [id, name, price, shopId, imageURL]
      )
    } catch (error) {
      return { success: false, error: new DatabaseError("DATABASE ERROR. TRY AGAIN LATER.") }
    }

    return { success: true, data: { name, price } }
  }
}

export async function finishProductsConnection () {
  await connection.end()
  return "off"
}