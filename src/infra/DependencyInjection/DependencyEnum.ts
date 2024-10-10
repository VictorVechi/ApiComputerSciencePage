export enum DependencyEnum {
    ROLE_REPOSITORY = 'IRepository<IRole>',
    USER_REPOSITORY = 'IRepository<IUser>',
    USER_VALIDATION_SERVICE = 'IUserValidationService',
    ROLE_VALIDATION_SERVICE = 'IRoleValidationService',
    JWT_SERVICE = 'IJwtService',
    ROLE_ADAPTER = 'IRoleAdapter',
    USER_ADAPTER = 'IUserAdapter',
    ROLE_APPLICATION = 'IRoleApp',
    USER_APPLICATION = 'IUserApp',
    USER_CONTROLLER = 'IUserController'
}