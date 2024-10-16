import { IUserLogin, IUserDelete } from "../repository/model/IUser"

export interface IUserValidationServices {
    validateRegister(data: any): Promise<boolean>
    validateLogin(data: any): Promise<IUserLogin>
    validateDelete(data: any): Promise<IUserDelete>
}