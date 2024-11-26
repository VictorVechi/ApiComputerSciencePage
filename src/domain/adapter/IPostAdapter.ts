import { IPost, IPostAdapted } from "../repository/model/IPost";

export interface IPostAdapter {
    toJson(post:IPost): IPostAdapted

}