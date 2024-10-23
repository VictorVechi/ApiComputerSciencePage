import { Types } from "mongoose";

export interface IPostApp {
    create(data: any): Promise<Object | null>;
    update(id:Types.ObjectId, data: any): Promise<Object | null>;
    delete(id: any): Promise<boolean>;
    findByTitle(title: string): Promise<Object | null>;
    findByTag(tag: string): Promise<Object[] | null>;
    
}