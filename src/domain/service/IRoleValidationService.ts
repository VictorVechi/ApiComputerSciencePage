import { Types } from "mongoose";
import { IRoleResponse } from "../repository/model/IRole";


export interface IRoleValidationService {
    validateRole(id: Types.ObjectId): Promise<IRoleResponse>;
}