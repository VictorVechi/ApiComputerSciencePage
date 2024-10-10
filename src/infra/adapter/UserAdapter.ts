import { Types } from "mongoose";
import { IUserAdapter } from "../../domain/adapter/IUserAdapter";
import { IUser, IUserAdapted } from "../../domain/repository/model/IUser";
import { injectable } from "tsyringe";

@injectable()
export default class UserAdapter implements IUserAdapter {
    _id: Types.ObjectId;
    name: string;
    email: string;
    id_cargo: Types.ObjectId;

    constructor(user: IUser) {
        this._id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.id_cargo = user.id_cargo;
    }

    toJson(): IUserAdapted {
        return {
            id: this._id.toString(),
            name: this.name,
            email: this.email,
            id_cargo: this.id_cargo
        }
    }
}