import { Express } from 'express'

export interface IRoleController {
    routes(app: Express): void
}