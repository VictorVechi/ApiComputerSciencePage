import { Model, Types, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import { IRepository } from "../../domain/repository/IRepository";
import mongodb from "mongodb";

class BaseRepository<T> implements IRepository<T> {
    constructor(private model: Model<T>) { }

    async create(data: T): Promise<T> {
        return await this.model.create(data);
    }

    async update(id: Types.ObjectId, data: UpdateQuery<T>): Promise<UpdateWriteOpResult> {
        return await this.model.updateOne({ _id: id}, data);
    }

    async delete(id: Types.ObjectId): Promise<mongodb.DeleteResult | null> {
        return await this.model.findOneAndDelete({ _id: id });
    }

    async findAll(): Promise<T[]> {
        return await this.model.find();
    }

    async findById(id: Types.ObjectId): Promise<Awaited<T> | null> {
        return await this.model.findOne({ _id: id });
    }

    async findByField(field: object): Promise<Awaited<T> | null> {
        return await this.model.findOne(field);
    }

    async findAllByField(field: object): Promise<T[]> {
        return await this.model.find(field);
    }

} export default BaseRepository;
