import { Types } from "mongoose";
import { IRoleAdapted } from "../repository/model/IRole";

export interface IRoleApp {
    execute(id: Types.ObjectId): Promise<IRoleAdapted | null>
}