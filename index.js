import express from "express"
import { mainRouter } from "./routes/mainRouter.js"
import { join } from "path"
import { UsersModel } from "./models/sql/UsersModel.js"
import { ProductsModel } from "./models/sql/ProductsModel.js"
import { productsRouter } from "./routes/productsRouter.js"

const app = express()

app.use(express.static(join(process.cwd(), "web")))
app.use(express.json())
app.use("/", mainRouter({ model: UsersModel }))
app.use("/products", productsRouter({ model: ProductsModel }))

app.listen(3000, () => console.log("SERVER LISTENING ON PORT 3000"))