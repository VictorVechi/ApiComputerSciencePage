import { IUserAdapted } from "../repository/model/IUser";

export interface IUserApp {
    create(data: any): Promise<Object | null>;
    login(data: any): Promise<IUserLoginResponse | null>
}

export interface IUserLoginResponse {
    user: IUserAdapted,
    token: string | null
}