import { IUser, IUserAdapted } from "../repository/model/IUser";


export interface IUserAdapter {
    toJson(user: IUser): IUserAdapted
}