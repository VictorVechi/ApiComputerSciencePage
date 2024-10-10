import { Types } from "mongoose";
import { IRole, IRoleAdapted } from "../../domain/repository/model/IRole";
import { injectable } from "tsyringe";
import { IRoleAdapter } from "../../domain/adapter/IRoleAdapter";

@injectable()
export class RoleAdapter implements IRoleAdapter {
    private _id: Types.ObjectId;
    private name: string;
    private description: string;

    constructor(role: IRole) {
        this._id = role._id;
        this.name = role.nome;
        this.description = role.descricao;
    }

    get id() {
        return this._id;
    }

    get roleName() {
        return this.name;
    }

    get roleDescription() {
        return this.description;
    }

    toJson(): IRoleAdapted {
        return {
            id: this._id.toString(),
            roleName: this.name
        }

    }
}