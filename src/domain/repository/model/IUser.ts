import { Types } from "mongoose";

export interface IUser {
    nome: string;
    email: string;
    password: string;
    id_cargo: Types.ObjectId;
}