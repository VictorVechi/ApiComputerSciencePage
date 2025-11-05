import mongoose, { Types } from "mongoose";
import { IUserSchema } from "../../../domain/repository/model/IUser";

const UserSchema = new mongoose.Schema<IUserSchema>({
    name: String,
    email: String,
    password: String,
    id_cargo: Types.ObjectId,
    search_area: String,
    subjects: String,
    show_user: Boolean,
    createdAt: Date,
    updatedAt: Date,
    active: Boolean
})

const UserModel = mongoose.model<IUserSchema>('User', UserSchema);

export default UserModel;