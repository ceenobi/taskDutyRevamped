import mongoose, { Schema, model, Document } from "mongoose"

export interface ITask extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    tag: "urgent" | "important";
    title: string;
    description: string;
}

const taskSchema = new Schema<ITask>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tag: {
        type: String,
        enum: ["urgent", "important"],
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 300,
    }

},
    {
        timestamps: true
    }

)

const Task = mongoose.models.Task || model<ITask>("Task", taskSchema)

export default Task