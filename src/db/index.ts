/* eslint-disable no-console */
import { dbConnection } from '../config/database'
import Lang from '../lang'
import { Posts } from './models'

const dbInit = () => {
  dbConnection.authenticate().then(() => {
    const message: string = Lang.__('db.success')
    console.info(message);
    return message
  }).catch((err: string) => {
    const message: string = Lang.__('db.error', { err: err.toString() })
    console.error(message)
    return message
  });

  // migration
  Posts.sync({ alter: true })
}

export default dbInit
