import {
  DataTypes, Model
} from 'sequelize'
import { dbConnection } from '../../config/database'

export interface PostsAttributes {
  id?: number
  userId?: number
  title?: string
  body?:string
}

class Posts extends Model<PostsAttributes> implements PostsAttributes {
  public id!: number

  public userId!: number

  public title!: string

  public body!: string

}

Posts.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'userId is required' },
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'title is required' },
    }
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  sequelize: dbConnection,
  modelName: 'Posts',
})

export default Posts
