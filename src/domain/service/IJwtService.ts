import { IUser, IUserAdapted } from "../repository/model/IUser";


export interface IJwtService {
    generateToken(data: IUserAdapted): Promise<string | null>;
    checkToken(req: any, res: any, next: any): void;
}