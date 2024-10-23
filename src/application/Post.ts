import { inject, injectable } from 'tsyringe';
import { DependencyEnum } from '../infra/DependencyInjection/DependencyEnum';
import PostRepository from '../infra/repository/PostRepository';
import PostValidationService from '../infra/service/PostValidationService';
import { IPostApp } from '../domain/application/IPostApp';
import { Types } from 'mongoose';

@injectable()
export default class Post implements IPostApp {
    constructor(
        @inject(DependencyEnum.POST_VALIDATION_SERVICE) private postValidationService: PostValidationService,
        @inject(DependencyEnum.POST_REPOSITORY) private postRepository: PostRepository
    ) {}

    async create(data: any): Promise<Object | null> {
        try {
            const validate = this.postValidationService.validateCreate(data);
            if (validate) {
                const date = new Date();
                return await this.postRepository.create({ ...data, createdAt: date, updatedAt: date, active: true });
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(id: Types.ObjectId, data: any): Promise<Object | null> {
        try {
            const validate = await this.postValidationService.validateUpdate(id, data);
            if (validate) {
                const date = new Date();
                return await this.postRepository.update(id, { ...data, updatedAt: date });
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
}