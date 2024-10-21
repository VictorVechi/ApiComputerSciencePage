import { injectable } from "tsyringe";
import { IPostSchema } from "../../domain/repository/model/IPost";
import BaseRepository from "./BaseRepository";
import PostModel from "./model/PostModel";

@injectable()
export default class PostRepository extends BaseRepository<IPostSchema> {
    constructor() {
        super(PostModel);
    }
    
    async findByTitle(title: string): Promise<IPostSchema | null> {
        return await this.findByField({ title: title });
    }

    async findByTag(tag: string): Promise<IPostSchema[]> {
        return await this.findAllByField({ 'tags.name': tag });
    }
}