import { Types } from "mongoose";


export interface ITagApp {
    create(data: any): Promise<Object | null>;
    update(id:Types.ObjectId, data: any): Promise<Object | null>;
    delete(id: any): Promise<boolean>;
    findByName(name: string): Promise<Object | null>;
    findTags(): Promise<Object[] | null>;
    
}