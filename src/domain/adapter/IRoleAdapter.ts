import { IRole, IRoleAdapted } from "../repository/model/IRole";

export interface IRoleAdapter {
    toJson(role:IRole): IRoleAdapted

}