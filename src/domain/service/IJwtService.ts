import { IUserAdapted } from "../repository/model/IUser";


export interface IJwtService {
    generateToken(data: IUserAdapted): Promise<string | null>;
    checkToken(req: any, res: any, next: any): void;
    checkTokenAndAddUserInfo(req: any, res: any, next: any): void;
    checkAdminToken(req: any, res: any, next: any): void;
    checkTokenAndReturnUser(req: any, res: any, next: any): void;
}