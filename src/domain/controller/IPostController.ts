import { Express } from 'express';

export interface IPostController {
    routes(app: Express): void;
}