import { Types } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    id_cargo: Types.ObjectId;
}