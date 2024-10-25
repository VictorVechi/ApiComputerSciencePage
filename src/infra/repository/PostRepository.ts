import { injectable } from "tsyringe";
import { IPostSchema } from "../../domain/repository/model/IPost";
import BaseRepository from "./BaseRepository";
import PostModel from "./model/PostModel";
import { Types, DeleteResult } from 'mongoose';

@injectable()
export default class PostRepository extends BaseRepository<IPostSchema> {
    constructor() {
        super(PostModel);
    }
    
    async findExactTitle(title: string): Promise<IPostSchema | null> {
        return await this.findByField({ title: title });
    }

    async findByTitle(title: string): Promise<IPostSchema[] | null> {
        return await this.findAllByField({ title: { $regex: title, $options: 'i'} });
    }

    async findByTag(tag: string): Promise<IPostSchema[] | null> {
        return await this.findAllByField({ 'tags.name': tag });
    }

    async deleteById(id: Types.ObjectId): Promise<DeleteResult | null>{
        return await this.delete(id);
    }
}