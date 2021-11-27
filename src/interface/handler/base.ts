/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

interface BaseHandlerInterface {
  create(req: Request, res: Response): Promise<Response>
  read(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
  patch(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
}

export default BaseHandlerInterface
