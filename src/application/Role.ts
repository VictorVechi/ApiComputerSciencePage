import { Types, UpdateWriteOpResult } from "mongoose";
import { inject, injectable } from "tsyringe";
import { DependencyEnum } from "../infra/DependencyInjection/DependencyEnum";
import RoleValidationService from "../infra/service/RoleValidationService";
import { IRoleAdapted, IRoleResponse, IRoleSchema } from "../domain/repository/model/IRole";
import { IRoleApp } from "../domain/application/IRoleApp";
import { IRoleAdapter } from "../domain/adapter/IRoleAdapter";
import RoleRepository from "../infra/repository/RoleRepository";


@injectable()
export default class Role implements IRoleApp {
    constructor (
        @inject(DependencyEnum.ROLE_VALIDATION_SERVICE) private roleValidationService: RoleValidationService,
        @inject(DependencyEnum.ROLE_ADAPTER) private roleAdapter: IRoleAdapter,
        @inject(DependencyEnum.ROLE_REPOSITORY) private roleRepository: RoleRepository
    ) {}

    async execute(id:Types.ObjectId): Promise<IRoleAdapted | null> {
        try {
            const response: IRoleResponse = await this.roleValidationService.validateRole(id);
            if(response.success && response.role) {
                return this.roleAdapter.toJson(response.role);
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async create(data: any): Promise<IRoleSchema | null> {
        try {
            const validate = await this.roleValidationService.validateCreate(data);
            if(validate) {
                const date = new Date();
                return await this.roleRepository.create({ ...data, createdAt: date, updatedAt: date, active: true });
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async searchAll(): Promise<IRoleAdapted[] | null> {
        try {
            const roles = await this.roleRepository.findAll();
            return roles.map(role => this.roleAdapter.toJson(role));
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(id: Types.ObjectId, data: any): Promise<UpdateWriteOpResult | null> {
        try {
            const validate = await this.roleValidationService.validateUpdate(id, data);
            if(validate) {
                const date = new Date();
                const role = await this.roleRepository.update(id, { ...data, updatedAt: date });
                return role
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(id: Types.ObjectId): Promise<any> {
        try {
            const validate = await this.roleValidationService.validateDelete(id);
            if(validate) {
                const role = await this.roleRepository.delete(id);
                return role;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}