import { Types } from "mongoose";

export interface IRole {
    _id: Types.ObjectId;
    name: string;
    description: string;
}

export interface IRoleSchema {
    _id: Types.ObjectId;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export interface IRoleResponse {
    role: IRole | null,
    error: string | null
    success: boolean
}

export interface IRoleAdapted {
    id: string;
    roleName: string;
    description: string;
}