import { Types } from "mongoose";

export interface IPostValidationService {
    validateCreate(post_details: any): boolean;
    validateUpdate(id: Types.ObjectId, post_details: any): Promise<boolean>;
    validateDelete(id: Types.ObjectId): Promise<boolean>;
}
