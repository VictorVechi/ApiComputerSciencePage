import { IRoleAdapted } from "../repository/model/IRole";

export interface IRoleAdapter {
    toJson(): IRoleAdapted

}