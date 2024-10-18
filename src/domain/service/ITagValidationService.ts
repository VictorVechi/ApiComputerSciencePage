import { Types } from "mongoose";


export interface ITagValidationService {
    validateCreateTag(tag: any): boolean;
    validateUpdateTag(tag: any): boolean;
    validateDeleteTag(id: Types.ObjectId): Promise<boolean>;
}