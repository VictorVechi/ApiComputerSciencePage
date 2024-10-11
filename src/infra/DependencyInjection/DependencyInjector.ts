import { container, DependencyContainer } from "tsyringe";
import { IRepository } from "../../domain/repository/IRepository";
import { IRole } from "../../domain/repository/model/IRole";
import RoleRepository from "../repository/RoleRepository";
import { DependencyEnum } from "./DependencyEnum";
import { IUser } from "../../domain/repository/model/IUser";
import UserRepository from "../repository/UserRepository";
import { IUserValidationServices } from "../../domain/service/IUserValidationService";
import UserValidationService from "../service/UserValidationService";
import { IRoleValidationService } from "../../domain/service/IRoleValidationService";
import RoleValidationService from "../service/RoleValidationService";
import { RoleAdapter } from "../adapter/RoleAdapter";
import { IRoleAdapter } from "../../domain/adapter/IRoleAdapter";
import Role from "../../application/Role";
import { IRoleApp } from "../../domain/application/IRoleApp";
import { IJwtService } from "../../domain/service/IJwtService";
import JwtService from "../service/JwtService";
import { IUserAdapter } from "../../domain/adapter/IUserAdapter";
import UserAdapter from "../adapter/UserAdapter";
import { IUserApp } from "../../domain/application/IUserApp";
import User from "../../application/User";
import { IUserController } from "../../domain/controller/IUserController";
import UserController from "../controllers/UserController";
import { IRoleController } from "../../domain/controller/IRoleController";
import RoleController from "../controllers/RoleController";


export default class DependencyInjector {
    static register(): DependencyContainer {
        this.registerRepositories();
        this.registerServices();
        this.registerAdapters();
        this.registerApplications();
        this.registerControllers();

        return container;
    }

    private static registerRepositories() {
        container.register<IRepository<IRole>>(DependencyEnum.ROLE_REPOSITORY, RoleRepository);
        container.register<IRepository<IUser>>(DependencyEnum.USER_REPOSITORY, UserRepository);
    }

    private static registerServices() {
        container.register<IUserValidationServices>(DependencyEnum.USER_VALIDATION_SERVICE, UserValidationService);
        container.register<IRoleValidationService>(DependencyEnum.ROLE_VALIDATION_SERVICE, RoleValidationService);
        container.register<IJwtService>(DependencyEnum.JWT_SERVICE, JwtService);
    }

    private static registerAdapters() {
        container.register<IRoleAdapter>(DependencyEnum.ROLE_ADAPTER, RoleAdapter);
        container.register<IUserAdapter>(DependencyEnum.USER_ADAPTER, UserAdapter);
    }

    private static registerApplications() {
        container.register<IRoleApp>(DependencyEnum.ROLE_APPLICATION, Role);
        container.register<IUserApp>(DependencyEnum.USER_APPLICATION, User);
    }

    private static registerControllers() {
        container.register<IUserController>(DependencyEnum.USER_CONTROLLER, UserController)
        container.register<IRoleController>(DependencyEnum.ROLE_CONTROLLER, RoleController)
    }
}