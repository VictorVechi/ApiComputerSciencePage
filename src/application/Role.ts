import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";
import { DependencyEnum } from "../infra/DependencyInjection/DependencyEnum";
import RoleValidationService from "../infra/service/RoleValidationService";
import { IRoleAdapted, IRoleResponse } from "../domain/repository/model/IRole";
import { IRoleApp } from "../domain/application/IRoleApp";
import { IRoleAdapter } from "../domain/adapter/IRoleAdapter";


@injectable()
export default class Role implements IRoleApp {
    constructor (
        @inject(DependencyEnum.ROLE_VALIDATION_SERVICE) private roleValidationService: RoleValidationService,
        @inject(DependencyEnum.ROLE_ADAPTER) private roleAdapter: IRoleAdapter
    ) {}

    async execute(id:Types.ObjectId): Promise<IRoleAdapted | null> {
        try {
            const response: IRoleResponse = await this.roleValidationService.validateRole(id);
            if(response.success) {
                return this.roleAdapter.toJson();
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}