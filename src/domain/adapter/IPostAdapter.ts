import { IPostAdapted, IPostSchema } from "../repository/model/IPost";

export interface IPostAdapter {
    toJson(post:IPostSchema): IPostAdapted

}