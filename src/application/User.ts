import { inject, injectable } from "tsyringe";
import { IUserApp, IUserLoginResponse } from "../domain/application/IUserApp";
import { DependencyEnum } from "../infra/DependencyInjection/DependencyEnum";
import { IUserValidationServices } from "../domain/service/IUserValidationService";
import UserRepository from "../infra/repository/UserRepository";
import UserAdapter from "../infra/adapter/UserAdapter";
import bcrypt from 'bcrypt';
import JwtService from "../infra/service/JwtService";

@injectable()
export default class User implements IUserApp {
    constructor(
        @inject(DependencyEnum.USER_VALIDATION_SERVICE) private userValidationService: IUserValidationServices,
        @inject(DependencyEnum.USER_REPOSITORY) private userRepository: UserRepository,
        @inject(DependencyEnum.USER_ADAPTER) private userAdapter: UserAdapter,
        @inject(DependencyEnum.JWT_SERVICE) private jwtService: JwtService
    ){}

    async create(data: any): Promise<Object | null> {
        const validate = await this.userValidationService.validateRegister(data);
        if (validate){
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(data.password, salt);
            return await this.userRepository.create({ ...data, password: passwordHash });
        }
        return null;
    }

    async login(data: any): Promise<IUserLoginResponse | null> {
        const validate = await this.userValidationService.validateLogin(data);
        if (validate.user && validate.login){
            const user = this.userAdapter.toJson();
            const token = await this.jwtService.generateToken(user);
            if (token) {
                return {
                    user,
                    token
                }
            }
        }
        return null;
    }

}