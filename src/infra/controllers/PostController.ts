import { inject, injectable } from 'tsyringe';
import { Express } from 'express';
import { IPostController } from '../../domain/controller/IPostController';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IPostApp } from '../../domain/application/IPostApp';
import { IJwtService } from '../../domain/service/IJwtService';

@injectable()
export default class PostController implements IPostController {
    constructor(
        @inject(DependencyEnum.POST_APPLICATION) private postApplication: IPostApp,
        @inject(DependencyEnum.JWT_SERVICE) private jwtApplication: IJwtService 
    ){}

    routes(app: Express) {
        
    }
}