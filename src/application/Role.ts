import { Types } from "mongoose";
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
}