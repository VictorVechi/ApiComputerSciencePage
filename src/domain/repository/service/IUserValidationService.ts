import { IUserLogin } from "../model/IUser"

export interface IUserValidationServices {
    validateRegister(data: any): Promise<boolean>
    validateLogin(data: any): Promise<IUserLogin>
}