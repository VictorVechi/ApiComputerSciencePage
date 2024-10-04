import mongoose, { Types } from "mongoose";
import { IUser } from "../../../domain/repository/model/IUser";

const UserSchema = new mongoose.Schema<IUser>({
    nome: String,
    email: String,
    password: String,
    id_cargo: Types.ObjectId
})

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;