import { Request, Response } from 'express'
import { CountryRepository } from '../../repository/postgres'
import { BaseHandlerInterface } from '../../interface/handler'
import JsonMessage from '../../utils/json'
import Lang from '../../lang'
import { PostsAttributes } from '../../db/models/Posts'
import axios from 'axios'

const readRequest = (req: Request) => {
  const payload: PostsAttributes = req?.body
  const id: number = +req?.params?.id
  const params: PostsAttributes = req?.params

  return { payload, id, params }
}

class CountryHandler implements BaseHandlerInterface {
  protected repository: CountryRepository = new CountryRepository()

  protected urlJsonServer: string = 'https://jsonplaceholder.typicode.com/posts'

  protected readRequest = (req: Request) => {
    const payload: PostsAttributes = req?.body
    const id: string = req?.params?.id
    const params: PostsAttributes = req?.params

    return { payload, id, params }
  }

  protected filterRequest = (req: Request) => {
    let newUrl: string

    if (req?.query?.id) {
      newUrl = `${this.urlJsonServer}?id=${req.query.id}`
    } else if(req?.query?.user_id) {
      newUrl = `${this.urlJsonServer}?user_id=${req.query.user_id}`
    } else if(req?.query?.title) {
      newUrl = `${this.urlJsonServer}?title=${req.query.title}`
    } else if(req?.query?.body) {
      newUrl = `${this.urlJsonServer}?body=${req.query.body}`
    } else {
      newUrl = this.urlJsonServer
    }

    return newUrl
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { payload } = readRequest(req)
      const response = await axios.post(this.urlJsonServer, payload)
      await this.repository.create(payload)
      const message: string = Lang.__('created.success')
      return JsonMessage.successResponse(res, Lang.__('created'), message, response.data)
    } catch (error: any) {
      return JsonMessage.catchResponse(req, res, error)
    }
  }

  read = async (req:Request, res: Response): Promise<Response> => {
    try {
      const newUrl = this.filterRequest(req)
      
      const result = await axios.get(newUrl)
      return JsonMessage.successResponse(res, Lang.__('succes') , 'get data sucessfully', result.data)
    } catch (error: any) {
      return JsonMessage.catchResponse(req, res, error)
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, payload } = readRequest(req)
      const toString = id.toString()
      const result = await axios.put(`${this.urlJsonServer}/${id}`, payload)

      const message: string = Lang.__('updated.success', { id:toString })
      return JsonMessage.successResponse(res, Lang.__('updated'), message, result.data)
    } catch (error: any) {
      return JsonMessage.catchResponse(req, res, error)
    }
  }

  patch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, payload } = readRequest(req)
      const toString = id.toString()
      const result = await axios.patch(`${this.urlJsonServer}/${id}`, payload)

      const message: string = Lang.__('updated.success', { id: toString })
      return JsonMessage.successResponse(res, Lang.__('updated'), message, result.data)
    } catch (error: any) {
      return JsonMessage.catchResponse(req, res, error)
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = readRequest(req)
      const toString = id.toString()

      const result = await axios.delete(`${this.urlJsonServer}/${id}`)
      
      const message: string = Lang.__('delete.id', { id: toString })
      return JsonMessage.successResponse(res, Lang.__('deleted'), message, result.data)
    } catch (error: any) {
      return JsonMessage.catchResponse(req, res, error)
    }
  }
}

export default new CountryHandler()
