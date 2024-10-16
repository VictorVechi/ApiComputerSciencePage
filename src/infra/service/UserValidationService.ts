import { inject, injectable } from "tsyringe";
import { IUserValidationServices } from "../../domain/service/IUserValidationService";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import UserRepository from "../repository/UserRepository";
import bcrypt from 'bcrypt';
import { IUserLogin, IUserDelete } from "../../domain/repository/model/IUser";

@injectable()
export default class UserValidationService implements IUserValidationServices {
    private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    constructor(
        @inject(DependencyEnum.USER_REPOSITORY) private userRepository: UserRepository
    )
    {}

    async validateRegister(data: any): Promise<boolean> {

        if (!data.email || !data.password || !data.name || !data.id_cargo) {
            console.log('Email, name and password are required');
            return false
        }

        if (!this.emailRegex.test(data.email)) {
            console.log('Invalid email format');
            return false
        }

        data.email = data.email.toLowerCase();

        if (await this.userRepository.findByEmail(data.email)) {
            console.log('Email already registered');
            return false
        }

        return true;
    }

    async validateLogin(data: any): Promise<IUserLogin> {
        try {
            
            const response: IUserLogin = {
                user: null,
                login: false,
                error: null
            }
    
            if (!data.email || !data.password || !this.emailRegex.test(data.email)) {
                response.login = false;
                response.error = 'Invalid data';
                return response;
            }

            data.email = data.email.toLowerCase();

            const user = await this.userRepository.findByEmail(data.email);
    
            if (!user) {
                response.login = false;
                response.error = 'User not found';
                return response;
            }
            
            if(!await bcrypt.compare(data.password, user.password)) {
                response.login = false;
                response.error = 'Invalid password';
                return response;
            }
    
            response.user = user;
            response.login = true;
            return response;

        } catch (error) {
            console.error(error);
            throw new Error('Error validating login');
        }
    }

    async validateDelete(data: any): Promise<IUserDelete> {
        
        const response: IUserDelete = {
            user: null,
            error: null
        }

        if(data.email){
            if (!this.emailRegex.test(data.email)) {
                response.error = 'Invalid email format';

                return response;
            }
            
            data.email = data.email.toLowerCase();
            const user = await this.userRepository.findByEmail(data.email);
            
            if (!user) {
                response.error = 'User not found';
                
                return response;
            } else {
                response.user = user
            }
        }
        
        return response;
    }
}