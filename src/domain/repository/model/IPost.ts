import { Types } from "mongoose";
import { ITagPost } from "./ITag";


export interface IPostSchema {
    _id: Types.ObjectId
    title: string;
    content: string;
    tags: ITagPost[];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export interface IPost {
    title: string;
    content: string;
    tags: ITagPost[];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}