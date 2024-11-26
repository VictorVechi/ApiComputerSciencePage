import { container, DependencyContainer } from "tsyringe";
import { IRepository } from "../../domain/repository/IRepository";
import { IRoleSchema } from "../../domain/repository/model/IRole";
import RoleRepository from "../repository/RoleRepository";
import { DependencyEnum } from "./DependencyEnum";
import { IUserSchema } from "../../domain/repository/model/IUser";
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
import TagRepository from "../repository/TagRepository";
import { ITagSchema } from "../../domain/repository/model/ITag";
import { ITagValidationService } from "../../domain/service/ITagValidationService";
import TagValidationService from "../service/TagValidationService";
import { ITagApp } from "../../domain/application/ITagApp";
import Tag from "../../application/Tag";
import { ITagController } from "../../domain/controller/ITagController";
import TagController from "../controllers/TagController";
import { IPostSchema } from "../../domain/repository/model/IPost";
import PostRepository from "../repository/PostRepository";
import { IPostValidationService } from "../../domain/service/IPostValidationService";
import PostValidationService from "../service/PostValidationService";
import { IPostApp } from "../../domain/application/IPostApp";
import Post from "../../application/Post";
import { IPostController } from "../../domain/controller/IPostController";
import PostController from "../controllers/PostController";
import { IPostAdapter } from "../../domain/adapter/IPostAdapter";
import { PostAdapter } from "../adapter/PostAdapter";

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
        container.register<IRepository<IRoleSchema>>(DependencyEnum.ROLE_REPOSITORY, RoleRepository);
        container.register<IRepository<IUserSchema>>(DependencyEnum.USER_REPOSITORY, UserRepository);
        container.register<IRepository<ITagSchema>>(DependencyEnum.TAG_REPOSITORY, TagRepository);
        container.register<IRepository<IPostSchema>>(DependencyEnum.POST_REPOSITORY, PostRepository);
    }

    private static registerServices() {
        container.register<IUserValidationServices>(DependencyEnum.USER_VALIDATION_SERVICE, UserValidationService);
        container.register<IRoleValidationService>(DependencyEnum.ROLE_VALIDATION_SERVICE, RoleValidationService);
        container.register<IJwtService>(DependencyEnum.JWT_SERVICE, JwtService);
        container.register<ITagValidationService>(DependencyEnum.TAG_VALIDATION_SERVICE, TagValidationService);
        container.register<IPostValidationService>(DependencyEnum.POST_VALIDATION_SERVICE, PostValidationService);
    }

    private static registerAdapters() {
        container.register<IRoleAdapter>(DependencyEnum.ROLE_ADAPTER, RoleAdapter);
        container.register<IUserAdapter>(DependencyEnum.USER_ADAPTER, UserAdapter);
        container.register<IPostAdapter>(DependencyEnum.POST_ADAPTER, PostAdapter);
    }

    private static registerApplications() {
        container.register<IRoleApp>(DependencyEnum.ROLE_APPLICATION, Role);
        container.register<IUserApp>(DependencyEnum.USER_APPLICATION, User);
        container.register<ITagApp>(DependencyEnum.TAG_APPLICATION, Tag);
        container.register<IPostApp>(DependencyEnum.POST_APPLICATION, Post);
    }

    private static registerControllers() {
        container.register<IUserController>(DependencyEnum.USER_CONTROLLER, UserController)
        container.register<IRoleController>(DependencyEnum.ROLE_CONTROLLER, RoleController)
        container.register<ITagController>(DependencyEnum.TAG_CONTROLLER, TagController)
        container.register<IPostController>(DependencyEnum.POST_CONTROLLER, PostController)
    }
}