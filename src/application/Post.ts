import { inject, injectable } from 'tsyringe';
import { DependencyEnum } from '../infra/DependencyInjection/DependencyEnum';
import PostRepository from '../infra/repository/PostRepository';
import PostValidationService from '../infra/service/PostValidationService';
import PostAdapter  from '../infra/adapter/PostAdapter';
import { IPostApp } from '../domain/application/IPostApp';
import { Types } from 'mongoose';

@injectable()
export default class Post implements IPostApp {
    constructor(
        @inject(DependencyEnum.POST_VALIDATION_SERVICE) private postValidationService: PostValidationService,
        @inject(DependencyEnum.POST_REPOSITORY) private postRepository: PostRepository,
        @inject(DependencyEnum.POST_ADAPTER) private postAdapter: PostAdapter
    ) {}

    async create(data: any): Promise<Object | null> {
        try {
            const validate = await this.postValidationService.validateCreate(data);
            if (validate) {
                const date = new Date();
                return await this.postRepository.create({ ...data, createdAt: date, updatedAt: date, active: true });
            }
            return null;
        } catch (error) {
            console.log(error);
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
            console.log(error);
            return null;
        }
    }
    
    async delete(id: Types.ObjectId): Promise<boolean | null> {
        try {
            const validate = await this.postValidationService.validateDelete(id);
            return validate

        } catch (error) {
            console.log(error);
            return null
        }
    }

        async search(data: any): Promise<Object[] | null> {
        try {
            if (!data.title && !data.tag) {
                throw new Error('At least one search criterion (title or tag) must be provided');
            }
    
            let posts;
    
            if (data.title) {
                posts = await this.postRepository.findByTitle(data.title);
            } else if (data.tag) {
                posts = await this.postRepository.findByTag(data.tag);
            }
            if(posts){
                return posts.map(post => this.postAdapter.toJson(post));
            } 

            return null
        } catch (error) {
            console.error('Error during search:', error);
            return null;
        }
    }

    async searchAll(): Promise<Object[] | null> {
        try {
            const posts = await this.postRepository.findAll();
            return posts.map(post => this.postAdapter.toJson(post));
        } catch (error) {
            console.log(error);
            return null;
        }
    } 
}