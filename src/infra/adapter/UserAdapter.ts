import { IUserAdapter } from "../../domain/adapter/IUserAdapter";
import { IUser, IUserAdapted, IUserShowAdapted } from "../../domain/repository/model/IUser";
import { injectable } from "tsyringe";

@injectable()
export default class UserAdapter implements IUserAdapter {
    
    toJson(user: IUser): IUserAdapted {
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            subjects: user.subjects,
            search_area: user.search_area,
            id_cargo: user.id_cargo,
            show_user: user.show_user
        }
    }

    toJsonShow(user: IUser): IUserShowAdapted {
        return {
            id: user._id.toString(),
            name: user.name,
            search_area: user.search_area,
            subjects: user.subjects
        }
    }
}