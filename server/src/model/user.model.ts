import mongoose, { Schema, model, Document } from "mongoose"

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    token: string;
    tokenExpires: Date;
}

//define the schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false //select prevents a field from being retrieved from the database
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true
}
)

const User = mongoose.models.User || model("User", userSchema)

export default User