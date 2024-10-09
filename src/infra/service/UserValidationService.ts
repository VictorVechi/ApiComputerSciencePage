import { inject, injectable } from "tsyringe";
import { IUserValidationServices } from "../../domain/repository/service/IUserValidationService";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import UserRepository from "../repository/UserRepository";


@injectable()
export default class UserValidationService implements IUserValidationServices {
    private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    constructor(
        @inject(DependencyEnum.USER_REPOSITORY) private userRepository: UserRepository
    )
    {}

    async validateRegister(data: any): Promise<boolean> {

        if (!data.email || !data.password || !data.name) {
            console.log('Email, name and password are required');
            return false
        }

        if (!this.emailRegex.test(data.email)) {
            console.log('Invalid email format');
            return false
        }

        if (await this.userRepository.findByEmail(data.email)) {
            console.log('Email already registered');
            return false
        }

        return true;
    }
}