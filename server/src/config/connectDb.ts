import mongoose from "mongoose";

type ConnectionState = {
    isConnected: Boolean;
}

let connection: ConnectionState = { isConnected: false }

const connectOptions = {
    dbName: "TaskDutyDb", //db name
    serverSelectionTimeoutMS: 10000, //timeout after 10secs
    socketTimeoutMS: 45000, //close socket after 45s of inactivity
    family: 4, //use IPV4 protocol
}

//connect to mongodb server
const connectToDb = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log("Mongodb is already connected")
        return;
    }
    //if we are not already connected, we want to establish connection to our db
    try {
        const mongoUri = process.env.MONGODB_URI
        if (!mongoUri) {
            throw new Error("Please ensure that your mongodb connection string is set")
        }
        const res = await mongoose.connect(mongoUri, connectOptions)
        connection.isConnected = res.connections[0].readyState === 1
        if (connection.isConnected) {
            console.log("Mongodb connected successfully")
            //handle connection events
            mongoose.connection.on("error", (err) => {
                console.log("Mongodb connection error", err)
            })
            mongoose.connection.on("disconnected", () => {
                console.log("Mongodb disconnected")
                connection.isConnected = false
            })
            process.on("SIGINT", async () => {
                await mongoose.connection.close()
                console.log("Mongodb connection closed through app termination")
                process.exit(0)
            })
        }
    } catch (error) {
        console.log("Mongodb connection error", error)
        connection.isConnected = false;
        const message = error instanceof Error ? error.message : String(error)
        throw new Error(`Failed to connect to Mongodb server: ${message}`)
    }
}

export default connectToDb