import express from "express";
import cors from 'cors';
import DependencyInjector from "../DependencyInjection/DependencyInjector";
import { container } from "tsyringe";
import { IUserController } from "../../domain/controller/IUserController";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import { IRoleController } from "../../domain/controller/IRoleController";
import { ITagController } from "../../domain/controller/ITagController";
import { IPostController } from "../../domain/controller/IPostController";

DependencyInjector.register();

const app = express();
app.use(cors());
app.use(express.json());

const userController = container.resolve<IUserController>(DependencyEnum.USER_CONTROLLER);
const roleController = container.resolve<IRoleController>(DependencyEnum.ROLE_CONTROLLER);
const tagController = container.resolve<ITagController>(DependencyEnum.TAG_CONTROLLER);
const postController = container.resolve<IPostController>(DependencyEnum.POST_CONTROLLER);

roleController.routes(app);
userController.routes(app);
tagController.routes(app);
postController.routes(app);

export default app;