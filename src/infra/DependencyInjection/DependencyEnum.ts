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
    POST_VALIDATION_SERVICE = 'IPostValidationService',

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
    POST_APPLICATION = 'IPostApp',
    
    /** 
     * Controllers
    */
    USER_CONTROLLER = 'IUserController',
    ROLE_CONTROLLER = 'IRoleController',
    TAG_CONTROLLER = 'ITagController',
    POST_CONTROLLER = 'IPostController'
}