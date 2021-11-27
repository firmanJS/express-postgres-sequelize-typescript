import HealthRest from './health_rest'
import PostsRest from './posts_rest'
import BaseRest from '../base'

class RestHttp extends BaseRest {
  public routes(): void {
    this.router.use('/api/v1', HealthRest)
    this.router.use('/api/v1/posts', PostsRest)
  }
}

export default new RestHttp().router
