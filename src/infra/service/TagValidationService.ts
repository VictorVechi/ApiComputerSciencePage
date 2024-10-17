import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";
import TagRepository from "../repository/TagRepository";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import { ITagValidationService } from "../../domain/service/ITagValidationService";

@injectable()
export default class TagValidationService implements ITagValidationService {
    constructor(
        @inject(DependencyEnum.TAG_REPOSITORY) private tagRepository: TagRepository
    ){}

    validateCreateTag(tag: any): boolean {
        if (tag.name && tag.description) {
            return true;
        }
        return false;
    }

    validateUpdateTag(tag: any): boolean {
        if (tag.name && tag.description) {
            return true;
        }
        return false;
    }

    async validateDeleteTag(id: Types.ObjectId): Promise<boolean> {
        if (id) {
            const tag = await this.tagRepository.deleteById(id);
            if (tag) {
                return true;
            }
        }
        return false;
    }
    

}