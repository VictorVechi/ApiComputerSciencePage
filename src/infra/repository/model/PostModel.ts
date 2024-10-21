import mongoose from "mongoose";
import { IPostSchema } from "../../../domain/repository/model/IPost";



const PostSchema = new mongoose.Schema<IPostSchema>({
    title: String,
    content: String,
    tags: [
        { 
            _id: mongoose.Schema.Types.ObjectId, 
            name: String 
        }
    ],
    createdAt: Date,
    updatedAt: Date,
    active: Boolean
})

const PostModel = mongoose.model<IPostSchema>('Post', PostSchema);

export default PostModel;