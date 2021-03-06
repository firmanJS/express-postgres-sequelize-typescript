/* eslint-disable no-console */
import express, { Application } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import RestHttp from './transport/rest/v1'
import Exceptions from './utils/exceptions'
import dbInit from './db'

class App {
  public app: Application
  protected morganFormat: string = '[:date[clf]] :remote-addr :remote-user \x1b[36m:method \x1b[36m:url \x1b[33m:status \x1b[32m:response-time\x1b[36m(ms)\x1b[0m'
  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
  }

  protected plugins(): void {
    dbInit() // for run migrations
    this.app.use(morgan(this.morganFormat, { stream: process.stderr }))
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.json({ limit: '200kb' }))
  }

  protected routes(): void {
    this.app.use(RestHttp)
    this.app.use(Exceptions.notFoundHandler)
    this.app.use(Exceptions.syntaxError)
    this.app.use(Exceptions.errorHandler)
  }
}

const { app } = new App()

export default app
