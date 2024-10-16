import { injectable } from "tsyringe";
import { IUser, IUserSchema } from "../../domain/repository/model/IUser";
import BaseRepository from "./BaseRepository";
import UserModel from "./model/UserModel";
import { Types } from 'mongoose';
import { DeleteResult } from 'mongodb';


@injectable()
class UserRepository extends BaseRepository<IUserSchema> {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this.findByField({ email: email });
    }

    async deleteById(id: Types.ObjectId): Promise<DeleteResult>{
        return await this.delete(id);
    }

}export default UserRepository;