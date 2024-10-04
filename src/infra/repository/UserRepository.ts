import { injectable } from "tsyringe";
import { IUser } from "../../domain/repository/model/IUser";
import BaseRepository from "./BaseRepository";
import UserModel from "./model/UserModel";


@injectable()
class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.findByField({ email: email });
    }

}export default UserRepository;