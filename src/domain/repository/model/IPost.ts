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
    _id: string,
    title: string;
    content: string;
    tags: ITagPost[];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export interface IPostAdapted {
    id: string;
    title: string;
    content: string;
    tags: ITagPost[];
}