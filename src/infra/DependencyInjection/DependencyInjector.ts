import { container, DependencyContainer } from "tsyringe";
import { IRepository } from "../../domain/repository/IRepository";
import { IRole } from "../../domain/repository/model/IRole";
import RoleRepository from "../repository/RoleRepository";
import { DependencyEnum } from "./DependencyEnum";
import { IUser } from "../../domain/repository/model/IUser";
import UserRepository from "../repository/UserRepository";


export default class DependencyInjector {
    static register(): DependencyContainer {
        this.registerRepositories();

        return container;
    }

    private static registerRepositories() {
        container.register<IRepository<IRole>>(DependencyEnum.ROLE_REPOSITORY, RoleRepository);
        container.register<IRepository<IUser>>(DependencyEnum.USER_REPOSITORY, UserRepository);
    }
}