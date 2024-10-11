import { Types } from "mongoose";
import { IUserAdapted } from "../repository/model/IUser";

export interface IUserApp {
    create(data: any): Promise<Object | null>;
    login(data: any): Promise<IUserLoginResponse | null>
    update(data: any): Promise<Object | null>
    updatePassword(data: any): Promise<Object | null>
    findById(id: Types.ObjectId): Promise<Object | null>
    findUsers(): Promise<Object | null>
}

export interface IUserLoginResponse {
    user: IUserAdapted,
    token: string | null
}