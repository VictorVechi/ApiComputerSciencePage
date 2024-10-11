import { Types } from "mongoose";
import { IRole, IRoleAdapted } from "../../domain/repository/model/IRole";
import { injectable } from "tsyringe";
import { IRoleAdapter } from "../../domain/adapter/IRoleAdapter";

@injectable()
export class RoleAdapter implements IRoleAdapter {

    toJson(role: IRole): IRoleAdapted {
        return {
            id: role._id.toString(),
            roleName: role.name
        }
    }
}