import { inject, injectable } from "tsyringe";
import { IUserApp, IUserLoginResponse, IUserDeleteResponse } from "../domain/application/IUserApp";
import { DependencyEnum } from "../infra/DependencyInjection/DependencyEnum";
import { IUserValidationServices } from "../domain/service/IUserValidationService";
import UserRepository from "../infra/repository/UserRepository";
import UserAdapter from "../infra/adapter/UserAdapter";
import bcrypt from 'bcrypt';
import JwtService from "../infra/service/JwtService";
import { Types } from "mongoose";

@injectable()
export default class User implements IUserApp {
    constructor(
        @inject(DependencyEnum.USER_VALIDATION_SERVICE) private userValidationService: IUserValidationServices,
        @inject(DependencyEnum.USER_REPOSITORY) private userRepository: UserRepository,
        @inject(DependencyEnum.USER_ADAPTER) private userAdapter: UserAdapter,
        @inject(DependencyEnum.JWT_SERVICE) private jwtService: JwtService
    ){}

    async create(data: any): Promise<Object | null> {
        try{
            const validate = await this.userValidationService.validateRegister(data);
            if (validate){
                const salt = await bcrypt.genSalt(12);
                const passwordHash = await bcrypt.hash(data.password, salt);
                const date = new Date();
                return await this.userRepository.create({ ...data, password: passwordHash, createdAt: date, updatedAt: date, active: true });
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async login(data: any): Promise<IUserLoginResponse | null> {
        try {
            const validate = await this.userValidationService.validateLogin(data);
            if (validate.user && validate.login){
                const user = this.userAdapter.toJson(validate.user);
                const token = await this.jwtService.generateToken(user);
                const refreshToken = await this.jwtService.generateRefreshToken(user);
                if (token) {
                    return {
                        user,
                        token,
                        refreshToken
                    }
                }
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async delete(data: any): Promise<IUserDeleteResponse | null> {
        try {
            const validate = await this.userValidationService.validateDelete(data);
            if (validate.user && !validate.error){
                const user = this.userAdapter.toJson(validate.user);
                const delete_result = await this.userRepository.delete(validate.user._id);
                return {
                    user,
                    deleted: delete_result ? true : false,
                    error: null
                }
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }        
    }

    async findUsers(): Promise<Object | null> {
        try {
            const users = await this.userRepository.findAll();
            return users.map(user => this.userAdapter.toJson(user));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async findById(id: Types.ObjectId): Promise<Object | null> {
        try {
            if(!id) return null;
            
            const user = await this.userRepository.findById(id);
            return user ? this.userAdapter.toJson(user) : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(data: any): Promise<Object | null> {
        try {
            const validate = await this.userValidationService.validateUpdate(data);
            if (validate){
                const date = new Date();
                return await this.userRepository.update(data.id, { ...data, updatedAt: date });
            }
            return null;
        } catch (error) {
            console.error('Error updating user');
            return null;
        }
    }

    async updatePassword(data: any): Promise<Object | null> {
        try {
            const user = await this.userValidationService.validateUpdatePassword(data);
            if (user){
                
                if(!await bcrypt.compare(data.password, user.password)) return null;
                
                const salt = await bcrypt.genSalt(12);
                const passwordHash = await bcrypt.hash(data.newPassword, salt);
                const date = new Date();
                return await this.userRepository.update(data.user.id, { password: passwordHash, updatedAt: date });
            }
            return null;
        } catch (error) {
            console.error('Error updating password');
            return null;
        }
    }

}