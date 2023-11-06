import express from "express"
import { mainRouter } from "./routes/mainRouter.js"
import { join } from "path"

const app = express()

app.use(express.static(join(process.cwd(), "web")))
app.use("/", mainRouter())

app.listen(3000, () => console.log("SERVER LISTENING ON PORT 3000"))