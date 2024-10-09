export interface IUserValidationServices {
    validateRegister(data: any): Promise<boolean> 
}