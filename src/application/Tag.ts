import { inject, injectable } from "tsyringe";
import { DependencyEnum } from "../infra/DependencyInjection/DependencyEnum";
import TagRepository from "../infra/repository/TagRepository";
import TagValidationService from "../infra/service/TagValidationService";
import { Types } from "mongoose";
import { ITagApp } from "../domain/application/ITagApp";


@injectable()
export default class Tag implements ITagApp {
    
    constructor(
        @inject(DependencyEnum.TAG_REPOSITORY) private tagRepository: TagRepository,
        @inject(DependencyEnum.TAG_VALIDATION_SERVICE) private tagValidationService: TagValidationService
    ){}

    async create(data: any): Promise<Object | null> {
        try{
            const validate = this.tagValidationService.validateCreateTag(data);
            if (validate){
                const date = new Date();
                return await this.tagRepository.create({...data, createdAt: date, updatedAt: date});
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(id:Types.ObjectId, data: any): Promise<Object | null> {
        try{
            const validate = this.tagValidationService.validateUpdateTag(data);
            if (validate){
                const date = new Date();
                data.updatedAt = date
                return await this.tagRepository.update(id, data);
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async delete(id: Types.ObjectId): Promise<boolean> {
        try {
            const validate = await this.tagValidationService.validateDeleteTag(id);
            if (validate){
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async findByName(name: string): Promise<Object | null> {
        try {
            return await this.tagRepository.findByName(name);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async findTags(): Promise<Object[] | null> {
        try {
            return await this.tagRepository.findAll();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}