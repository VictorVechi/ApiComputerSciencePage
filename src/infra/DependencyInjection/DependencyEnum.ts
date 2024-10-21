export enum DependencyEnum {
    
    /**
     * Repositories
     */
    ROLE_REPOSITORY = 'IRepository<IRoleSchema>',
    USER_REPOSITORY = 'IRepository<IUserSchema>',
    TAG_REPOSITORY = 'IRepository<ITagSchema>',
    POST_REPOSITORY = 'IRepository<IPostSchema>',
    
    /**
     * Services
     */
    JWT_SERVICE = 'IJwtService',
    USER_VALIDATION_SERVICE = 'IUserValidationService',
    ROLE_VALIDATION_SERVICE = 'IRoleValidationService',
    TAG_VALIDATION_SERVICE = 'ITagValidationService',

    /** 
     * Adapters
    */
    ROLE_ADAPTER = 'IRoleAdapter',
    USER_ADAPTER = 'IUserAdapter',

    /** 
     * Use Cases
    */
    ROLE_APPLICATION = 'IRoleApp',
    USER_APPLICATION = 'IUserApp',
    TAG_APPLICATION = 'ITagApp',
    
    /** 
     * Controllers
    */
    USER_CONTROLLER = 'IUserController',
    ROLE_CONTROLLER = 'IRoleController',
    TAG_CONTROLLER = 'ITagController',
}