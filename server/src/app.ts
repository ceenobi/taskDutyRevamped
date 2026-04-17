import { config } from "dotenv"
import express, { json, Request, Response, NextFunction } from "express"
import createHttpError, { isHttpError } from "http-errors"
import morgan from "morgan"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"

config() //loads values from an env file
const app = express()

//middleware are functions that execute between a client request and a server response. They can be used to process, modifyor validate data.

const corsOptions = {
    origin: ['http://localhost:5173'], // Only allow this domain
    methods: ['GET', 'POST', "PATCH", "DELETE"],      // Allow only specific HTTP methods
    credentials: true              // Allow cookies/authorization headers
};

app.use(cors(corsOptions));
app.use(json({ limit: "25mb" })) //parses requests in json body no greater than 25mb
app.use(express.urlencoded({ extended: true })) //parses requests in urlencoded body format
app.disable("x-powered-by") //removes x-powered-by
app.use(morgan("combined"))


//test app by creating express route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//api routes
app.use("/api/users", userRoutes)
app.use("/api/tasks", taskRoutes)

//endpoint specific errors
app.use((req: Request, res: Response, next: NextFunction) => {
    return next(createHttpError(404, "Endpoint not found on this server"))
})


//general errors 
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let statusCode = 500;
    let errorMessage = "Internal server error, please again later"
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app