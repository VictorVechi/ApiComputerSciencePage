import { IUserLogin } from "../repository/model/IUser"

export interface IUserValidationServices {
    validateRegister(data: any): Promise<boolean>
    validateLogin(data: any): Promise<IUserLogin>
    validateUpdate(data: any): Promise<boolean>
    validateUpdatePassword(data: any): Promise<boolean>
}