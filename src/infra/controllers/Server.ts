import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import DependencyInjector from "../DependencyInjection/DependencyInjector";
import { container } from "tsyringe";
import { IUserController } from "../../domain/controller/IUserController";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import { IRoleController } from "../../domain/controller/IRoleController";
import { ITagController } from "../../domain/controller/ITagController";
import { IPostController } from "../../domain/controller/IPostController";
import { apiLimiter } from "../middleware/rateLimiter";

DependencyInjector.register();

const app = express();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["https://www.google.com"],
        }
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

app.use(cors());
app.use(express.json());

app.use('/api/', apiLimiter);

const userController = container.resolve<IUserController>(DependencyEnum.USER_CONTROLLER);
const roleController = container.resolve<IRoleController>(DependencyEnum.ROLE_CONTROLLER);
const tagController = container.resolve<ITagController>(DependencyEnum.TAG_CONTROLLER);
const postController = container.resolve<IPostController>(DependencyEnum.POST_CONTROLLER);

roleController.routes(app);
userController.routes(app);
tagController.routes(app);
postController.routes(app);

export default app;