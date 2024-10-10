import { Express } from 'express';

export interface IUserController {
    routes(app: Express):void
}