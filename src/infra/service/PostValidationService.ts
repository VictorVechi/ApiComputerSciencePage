import {inject, injectable} from 'tsyringe';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IPostValidationService } from '../../domain/service/IPostValidationService';
import PostRepository from '../repository/PostRepository';
import { Types } from 'mongoose';

@injectable()
export default class PostValidationService implements IPostValidationService {
    constructor(
        @inject(DependencyEnum.POST_REPOSITORY) private postRepository: PostRepository
    ) {}

    async validateCreate(post_details: any): Promise<boolean> {
        if (!post_details.title) {
            console.log('Title is required');
            return false;
        }

        if (!post_details.content) {
            console.log('Content is required');
            return false;
        }

        if(!post_details.tags) {
            console.log('At least one tag is required')
            return false;
        }

        const title_exists = await this.postRepository.findExactTitle(post_details.title);
        
        if(title_exists){
            console.log("Title already exists")
            return false
        }

        return true;
    }

    async validateUpdate(id: Types.ObjectId, post_details: any): Promise<boolean> {
        if (!id) {
            console.log('Id is required');
            return false;
        }

        if (!post_details.title) {
            console.log('Title is required');
            return false;
        }

        if (!post_details.content) {
            console.log('Content is required');
            return false;
        }

        if(!post_details.tags) {
            console.log('At least one tag is required')
            return false;
        }

        const post = await this.postRepository.findById(id);
        if(post && post._id.toString() == id){
            return true;
        }

        console.log('Post not found');
        return false;
    }

    async validateDelete(id: Types.ObjectId): Promise<boolean> {
        if (!id) {
            console.log('Id is required');
            return false;
        }

        const post = await this.postRepository.findById(id);
        if(post && post._id.toString() == id){
            const delete_result = await this.postRepository.deleteById(id);
            if(delete_result){
                return true;
            }
        }

        console.log('Post not found');
        return false;
    }
} 
