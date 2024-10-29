import { Types } from "mongoose";

export interface IPostValidationService {
    validateCreate(post_details: any): Promise<boolean>;
    validateUpdate(id: Types.ObjectId, post_details: any): Promise<boolean>;
    validateDelete(id: Types.ObjectId): Promise<boolean>;
}
