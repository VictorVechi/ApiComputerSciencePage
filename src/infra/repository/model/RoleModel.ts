import mongoose from "mongoose";
import { IRole } from "../../../domain/repository/model/IRole";


const RoleSchema = new mongoose.Schema<IRole>({
    nome: String,
    descricao: String
})

const RoleModel = mongoose.model<IRole>('Role', RoleSchema);

export default RoleModel;