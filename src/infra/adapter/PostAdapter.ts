import { IPost, IPostAdapted } from "../../domain/repository/model/IPost";
import { injectable } from "tsyringe";
import { IPostAdapter } from "../../domain/adapter/IPostAdapter";

@injectable()
export class PostAdapter implements IPostAdapter {

    toJson(post: IPost): IPostAdapted {
        return {
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            tags: post.tags,
        }
    }
}