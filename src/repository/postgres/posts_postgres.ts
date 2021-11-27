import Posts, { PostsAttributes } from '../../db/models/Posts'
import { PostsRespositoryInterface } from '../../interface/repository'

class PostsRepository implements PostsRespositoryInterface {
  create = async (payload: PostsAttributes): Promise<PostsAttributes> => {
    const rows = await Posts.create(payload)
    return rows
  }
}

export default PostsRepository
