import { PostsAttributes } from '../../db/models/Posts'

interface POstsRespositoryInterface {
  create(payload: PostsAttributes): Promise<PostsAttributes>
}

export default POstsRespositoryInterface
