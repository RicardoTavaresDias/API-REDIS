import express from "express"
import cors from "cors"
import { router } from "./routers"
import { ErrorHandling } from "./middlewares/Error-Handling"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use(ErrorHandling)

export { app }