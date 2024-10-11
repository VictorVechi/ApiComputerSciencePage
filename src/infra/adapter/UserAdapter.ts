import { Types } from "mongoose";
import { IUserAdapter } from "../../domain/adapter/IUserAdapter";
import { IUser, IUserAdapted } from "../../domain/repository/model/IUser";
import { injectable } from "tsyringe";

@injectable()
export default class UserAdapter implements IUserAdapter {
    
    toJson(user: IUser): IUserAdapted {
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            id_cargo: user.id_cargo
        }
    }
}