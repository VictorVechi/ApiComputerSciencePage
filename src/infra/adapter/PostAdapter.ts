import { IPostAdapted, IPostSchema } from "../../domain/repository/model/IPost";
import { injectable } from "tsyringe";
import { IPostAdapter } from "../../domain/adapter/IPostAdapter";

@injectable()
export default class PostAdapter implements IPostAdapter {

    toJson(post: IPostSchema): IPostAdapted {
        return {
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            tags: post.tags,
        }
    }
}