import test from "node:test"
import assert from "node:assert"
import jwt from "jsonwebtoken"
import { ProductsModel, finishProductsConnection } from "./models/sql/ProductsModel.js"
import { UsersModel, finishUsersConnection } from "./models/sql/UsersModel.js"
import { ValidationError } from "./utils/errors.js"

const SECRET_KEY = "SECREY_KEY_HERe!"
let TEST_CREDENTIALS = {
  username: "test",
  password: "test123",
  id: '8672a543-7db2-11ee-9d7b-4cedfb468ce2'
}

test("Log user", async (t) => {
  const user = {
    username: "test",
    password: "test123"
  }
  const result = await UsersModel.loginUser(user)
  const { username, id } = jwt.verify(result.data, SECRET_KEY)

  return assert.deepStrictEqual(user.username, username)
})

test("Reject invalid user login", async () => {
  const invalidUser = {
    username: "123456789101112131415161718192026666661681",
    password: "password"
  }

  const result = await UsersModel.loginUser(invalidUser)

  assert.strictEqual(result.error instanceof ValidationError, true)
})

test("Get user products", async () => {
  const result = await ProductsModel.getUserProducts(TEST_CREDENTIALS.id)
  const expectedProducts = [{
    shop_name: "Test Shop",
    product_name: "Test product",
    product_price: 256
  }]

  assert.deepStrictEqual(result.data, expectedProducts)
})


test("Turn off DB's connections", async (t) => {
  await t.test("Turn off Users Connection", async () => {
    const connectionStatus = await finishProductsConnection()
    assert.strictEqual(connectionStatus, "off")
  })

  await t.test("Turn of Products Connection", async () => {
    const connectionStatus = await finishUsersConnection()
    assert.strictEqual(connectionStatus, "off")
  })
})