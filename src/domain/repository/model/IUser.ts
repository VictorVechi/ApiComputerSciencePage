import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    id_cargo: Types.ObjectId;
}
export interface IUserLogin {
    user: IUser | null,
    login: boolean,
    error: string | null
}

export interface IUserAdapted {
    id: string;
    name: string;
    email: string;
    id_cargo: Types.ObjectId;
}