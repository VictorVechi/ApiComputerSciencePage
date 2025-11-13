import { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IGoogleAuthService } from '../../domain/service/IGoogleAuthService';
import { IUserApp } from '../../domain/application/IUserApp';
import { IJwtService } from '../../domain/service/IJwtService';

@injectable()
export default class AuthController {
    constructor(
        @inject(DependencyEnum.GOOGLE_AUTH_SERVICE) private googleAuthService: IGoogleAuthService,
        @inject(DependencyEnum.USER_APPLICATION) private userApplication: IUserApp,
        @inject(DependencyEnum.JWT_SERVICE) private jwtService: IJwtService
    ) {}

    routes(app: Express) {
        app.get('/api/auth/google', (_req, res) => {
            const clientId = process.env.GOOGLE_CLIENT_ID;
            const redirectUri = process.env.GOOGLE_REDIRECT_URI;
            const scope = 'email profile';
            const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
            
            res.redirect(googleAuthUrl);
        });

        app.get('/api/auth/google/callback', async (req, res) => {
            try {
                const { code } = req.query;
                
                if (!code) {
                    return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_code`);
                }

                const googleUser = await this.googleAuthService.verifyToken(code as string);
                
                if (!googleUser) {
                    return res.redirect(`${process.env.FRONTEND_URL}/login?error=invalid_token`);
                }

                let user = await this.userApplication.findByEmail(googleUser.email);

                if (!user) {
                    const defaultRoleId = process.env.DEFAULT_USER_ROLE_ID || '507f1f77bcf86cd799439011';
                    
                    user = await this.userApplication.create({
                        email: googleUser.email,
                        name: googleUser.name,
                        password: Math.random().toString(36),
                        id_cargo: defaultRoleId
                    }) as any;
                }

                if (!user) {
                    return res.redirect(`${process.env.FRONTEND_URL}/login?error=user_creation_failed`);
                }

                const token = await this.jwtService.generateToken(user as any);
                
                res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
            } catch (err) {
                console.error(err);
                res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
            }
        });
    }
}
