import { IUserAdapted } from "../repository/model/IUser";

export interface IUserApp {
    create(data: any): Promise<Object | null>;
    login(data: any): Promise<IUserLoginResponse | null>
    delete(data: any): Promise<IUserDeleteResponse | null>
}

export interface IUserLoginResponse {
    user: IUserAdapted,
    token: string | null
}

export interface IUserDeleteResponse {
    user: IUserAdapted | null,
    deleted: boolean,
    error: string | null
}