import { Types } from "mongoose";

export interface IPostApp {
    create(data: any): Promise<Object | null>;
    update(id: Types.ObjectId, data: any): Promise<Object | null>;
    delete(id: Types.ObjectId): Promise<boolean | null>;
    search(data: any): Promise<Object[] | null>;
    searchAll(): Promise<Object[] | null>;
    
}