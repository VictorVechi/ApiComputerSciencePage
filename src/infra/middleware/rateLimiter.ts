import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 20, 
    standardHeaders: true, 
    legacyHeaders: false, 
    skipSuccessfulRequests: false, 
    handler: (_req, res) => res.status(429).json({
        error: 'Muitas tentativas de login',
        code: 'rate_limit_exceeded'
    })
});

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({
        error: 'Limite de requisições excedido',
        code: 'rate_limit_exceeded'
    })
});

export const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: (_req, res) => res.status(429).json({
        error: 'Limite de operações excedido',
        code: 'rate_limit_exceeded'
    })
});

export const postCreationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({
        error: 'Limite de posts excedido',
        code: 'rate_limit_exceeded'
    })
});
