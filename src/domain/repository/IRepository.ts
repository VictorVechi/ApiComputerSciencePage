import { Types, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import mongodb from "mongodb";

export interface IRepository<T> {
    create(data: T): Promise<T>;
    update(id: Types.ObjectId, data: UpdateQuery<T>): Promise<UpdateWriteOpResult>;
    delete(id: Types.ObjectId): Promise<mongodb.DeleteResult | null>;
    findAll(): Promise<T[]>;
    findById(id: Types.ObjectId): Promise<Awaited<T> | null>;
    findByField(field: object): Promise<Awaited<T> | null>;
}