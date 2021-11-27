import { Request, Response } from 'express'
import httpStatus from 'http-status'
import {
  ExceptionsInterface, WithDataInterface
} from '../interface/response'
import Lang from '../lang'

class JsonMessage {
  catchResponse = (req: Request, res:Response, error:any): Response => {
    const manipulate: string = error.toString().split(':')
    let message: string

    if (manipulate[0] === 'SequelizeConnectionRefusedError') {
      message = `${manipulate[0]}: Sequelize db is disconnected`
    } else {
      message = error.toString()
    }

    const result: ExceptionsInterface = {
      message: Lang.__('error'),
      error: message
    }

    type logging = {
      url: string
      error: string
    }

    if (process.env.NODE_ENV === 'development') {
      const logging: logging = {
        url: req.originalUrl,
        error: error.toString()
      }
      console.error(logging)
    } else {
      // sent to sentry or etc
    }

    return res.status(httpStatus.BAD_REQUEST).json(result)
  }

  NotFoundResponse = (res: Response, message: string): Response => {
    const result: ExceptionsInterface = {
      message: Lang.__('not_found'),
      error: message
    }

    return res.status(httpStatus.NOT_FOUND).json(result)
  }

  successResponse = (res: Response, status:string, message: string, data: object): Response => {
    let code: number = httpStatus.OK
    if (status === Lang.__('created')) {
      code = httpStatus.CREATED
    } else {
      code = httpStatus.OK
    }
    const result: WithDataInterface = {
      status,
      message,
      data
    }
    return res.status(code).json(result)
  }

}

export default new JsonMessage()
