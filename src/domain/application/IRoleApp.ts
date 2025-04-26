import { Types, UpdateWriteOpResult } from "mongoose";
import { IRoleAdapted, IRoleSchema } from "../repository/model/IRole";

export interface IRoleApp {
    execute(id: Types.ObjectId): Promise<IRoleAdapted | null>
    create(data: any): Promise<IRoleSchema | null>
    searchAll(): Promise<IRoleAdapted[] | null>
    update(id: Types.ObjectId, data: any): Promise<UpdateWriteOpResult | null>
    delete(id: Types.ObjectId): Promise<any>
}