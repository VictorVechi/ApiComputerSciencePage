import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import RoleRepository from "../repository/RoleRepository";
import { IRoleResponse } from "../../domain/repository/model/IRole";
import { IRoleValidationService } from "../../domain/service/IRoleValidationService";

@injectable()
export default class RoleValidationService implements IRoleValidationService{
    constructor(
        @inject(DependencyEnum.ROLE_REPOSITORY) private roleRepository: RoleRepository 
    ){}

    async validateRole(id: Types.ObjectId ): Promise<IRoleResponse> {
        const response: IRoleResponse = {
            role: null,
            error: null,
            success: false
        }
        if (!id) {
            console.log('Name is required');
            response.error = 'Name is required';
            response.success = false;
            return response
        }

        const role = await this.roleRepository.findById(id);

        if(!role) {
            console.log('Role not found');
            response.error = 'Role not found';
            response.success = false;
            return response
        }

        response.role = role;
        response.success = true;
        return response;
    }
}