import { IUserAdapted } from "../repository/model/IUser";


export interface IUserAdapter {
    toJson(): IUserAdapted
}