import { Types } from "mongoose";


export interface ITagSchema {
    _id: Types.ObjectId;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export interface ITag {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}