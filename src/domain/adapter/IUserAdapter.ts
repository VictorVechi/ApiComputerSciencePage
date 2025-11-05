import { IUser, IUserAdapted, IUserShowAdapted } from "../repository/model/IUser";


export interface IUserAdapter {
    toJson(user: IUser): IUserAdapted
    toJsonShow(user: IUser): IUserShowAdapted
}