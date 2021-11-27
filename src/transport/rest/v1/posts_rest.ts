import BaseRest from '../base'
import { PostsHandler } from '../../../handlers/v1'

class UserRest extends BaseRest {
  public routes(): void {
    this.router.post('/', PostsHandler.create)
    this.router.get('/', PostsHandler.read)
    this.router.put('/:id', PostsHandler.update)
    this.router.patch('/:id', PostsHandler.patch)
    this.router.delete('/:id', PostsHandler.delete)
  }
}

export default new UserRest().router
