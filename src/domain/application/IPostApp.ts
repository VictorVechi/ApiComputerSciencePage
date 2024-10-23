import { Types } from "mongoose";
import { ITagPost } from "../repository/model/ITag";

export interface IPostApp {
    create(data: any): Promise<Object | null>;
    update(id:Types.ObjectId, data: any): Promise<Object | null>;
    delete(id: any): Promise<boolean | null>;
    findByTitle(title: string): Promise<Object | null>;
    findByTag(tag: ITagPost): Promise<Object[] | null>;
    
}