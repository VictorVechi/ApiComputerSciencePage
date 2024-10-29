import { Types } from "mongoose";
import { ITagSchema } from "../../domain/repository/model/ITag";
import BaseRepository from "./BaseRepository";
import TagModel from "./model/TagModel";
import { DeleteResult } from 'mongodb';
import { injectable } from "tsyringe";


@injectable()
export default class TagRepository extends BaseRepository<ITagSchema> {
    constructor() {
        super(TagModel);
    }

    async findByName(name: string): Promise<ITagSchema | null> {
        return await this.findByField({ name: name });
    }

    async deleteById(id: Types.ObjectId): Promise<DeleteResult | null>{
        return await this.delete(id);
    }

}