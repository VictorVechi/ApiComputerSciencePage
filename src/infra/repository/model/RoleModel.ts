import mongoose from "mongoose";
import { IRoleSchema } from "../../../domain/repository/model/IRole";


const RoleSchema = new mongoose.Schema<IRoleSchema>({
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
    active: Boolean

})

const RoleModel = mongoose.model<IRoleSchema>('Role', RoleSchema);

export default RoleModel;