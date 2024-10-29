import mongoose from "mongoose";
import { ITagSchema } from "../../../domain/repository/model/ITag";


const TagSchema = new mongoose.Schema<ITagSchema>({
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
    active: Boolean
})

const TagModel = mongoose.model<ITagSchema>('Tag', TagSchema);

export default TagModel;