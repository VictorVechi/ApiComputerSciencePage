import { Express } from 'express';

export interface ITagController {
    routes(app: Express):void
}