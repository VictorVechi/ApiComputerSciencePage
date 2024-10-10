import { Types } from "mongoose";

export interface IRole {
    _id: Types.ObjectId;
    nome: string;
    descricao: string;
}

export interface IRoleResponse {
    role: IRole | null,
    error: string | null
    success: boolean
}

export interface IRoleAdapted {
    id: string;
    roleName: string;
}