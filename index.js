import express from "express"
import { join } from "path"

const app = express()

app.use(express.static(join(process.cwd(), "web")))

app.get("/", (req, res) => {
  res.sendFile(join(process.cwd(), "web", "home.html"))
})

app.listen(3000, () => console.log("SERVER LISTENING ON PORT 3000"))