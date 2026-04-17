import app from "./src/app.js"
import connectToDb from "./src/config/connectDb.js"

const PORT = process.env.PORT || 3500;

if (!PORT) {
    throw new Error("Please ensure that a port number is provided")
}

//establish and start our app
connectToDb()
    .then(() => {
        startServer()
    })
    .catch((error) => {
        console.log("Invalid database connection", error)
    })


function startServer() {
    app.listen(PORT, (error) => {
        if (error) {
            console.log("Cannot start server, please check your connection", error)
        } else {
            console.log(`Server is connected to port: ${PORT}`)
        }
    })
}