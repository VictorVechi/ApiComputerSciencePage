import express from "express";
import DependencyInjector from "../DependencyInjection/DependencyInjector";
import UserController from "./UserController";
import { container } from "tsyringe";
import { IUserController } from "../../domain/controller/IUserController";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import { IRoleController } from "../../domain/controller/IRoleController";

DependencyInjector.register();

const app = express();
app.use(express.json());

const userController = container.resolve<IUserController>(DependencyEnum.USER_CONTROLLER);
const roleController = container.resolve<IRoleController>(DependencyEnum.ROLE_CONTROLLER);

roleController.routes(app);
userController.routes(app);

export default app;