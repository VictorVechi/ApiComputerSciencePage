import { inject, injectable } from "tsyringe";
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { IUserAdapted } from "../../domain/repository/model/IUser";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import Role from "../../application/Role";
import { IJwtService } from "../../domain/service/IJwtService";

@injectable()
export default class JwtService implements IJwtService {
    constructor(
        @inject(DependencyEnum.ROLE_APPLICATION) private roleApplication: Role
    ) {
        // Vincula os métodos ao contexto da classe
        this.checkToken = this.checkToken.bind(this);
        this.checkTokenAndAddUserInfo = this.checkTokenAndAddUserInfo.bind(this);
        this.checkAdminToken = this.checkAdminToken.bind(this);
        this.checkTokenAndReturnUser = this.checkTokenAndReturnUser.bind(this);
    }

    public async generateToken(data: IUserAdapted): Promise<string | null> {
        const secretKey = process.env.SECRET_KEY;
        const role = await this.roleApplication.execute(data.id_cargo);
        if(secretKey !== undefined && role !== null){
            return jwt.sign({
                id: data.id,
                name: data.name,
                email: data.email,
                cargo: role.roleName,
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
            }, secretKey);
        }
        return null;
    }

    public isExpired(token: string): boolean {
        try {
            const decoded = jwt.decode(token) as JwtPayload | null;
            if (!decoded || typeof decoded.exp !== 'number') return false;
            const now = Math.floor(Date.now() / 1000);
            return decoded.exp <= now;
        } catch {
            return false;
        }
    }

    private extractToken(req: any): string | null {
        const authHeader = req.headers?.['authorization'];
        if (!authHeader) return null;
        const parts = String(authHeader).split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
        return parts[1];
    }

    private unauthorized(res: any, code: 'no_token' | 'token_expired' | 'invalid_token') {
        const descriptions: Record<string,string> = {
            no_token: 'No Bearer token provided',
            token_expired: 'The token has expired',
            invalid_token: 'Invalid or malformed token'
        };
        res.setHeader('WWW-Authenticate', `Bearer error="invalid_token", error_description="${descriptions[code]}"`);
        return res.status(401).json({ error: 'Unauthorized', code });
    }

    private isTokenExpiredError(err: any): boolean {
        return err?.name === 'TokenExpiredError';
    }

    public checkToken = (req: any, res: any, next: any) => {
        const token = this.extractToken(req);
        if (!token) return this.unauthorized(res, 'no_token');

        const secret = process.env.SECRET_KEY;
        if (!secret) return this.unauthorized(res, 'invalid_token');

        try {
            jwt.verify(token, secret);
            next();
        } catch (err: any) {
            if (this.isTokenExpiredError(err)) {
                return this.unauthorized(res, 'token_expired');
            }
            return this.unauthorized(res, 'invalid_token');
        }
    };

    public checkTokenAndAddUserInfo = (req: any, res: any, next: any) => {
        const token = this.extractToken(req);
        if (!token) return this.unauthorized(res, 'no_token');

        const secret = process.env.SECRET_KEY;
        if (!secret) return this.unauthorized(res, 'invalid_token');

        try {
            const decoded: any = jwt.verify(token, secret);
            req.body.user = decoded;
            next();
        } catch (err: any) {
            if (this.isTokenExpiredError(err)) {
                return this.unauthorized(res, 'token_expired');
            }
            return this.unauthorized(res, 'invalid_token');
        }
    };

    public checkAdminToken = (req: any, res: any, next: any) => {
        const token = this.extractToken(req);
        if (!token) return this.unauthorized(res, 'no_token');

        const secret = process.env.SECRET_KEY;
        if (!secret) return this.unauthorized(res, 'invalid_token');

        try {
            const decoded: any = jwt.verify(token, secret);
            if (decoded.cargo === 'admin') {
                next();
            } else {
                return this.unauthorized(res, 'invalid_token');
            }
        } catch (err: any) {
            if (this.isTokenExpiredError(err)) {
                return this.unauthorized(res, 'token_expired');
            }
            return this.unauthorized(res, 'invalid_token');
        }
    };

    public checkTokenAndReturnUser = (req: any, res: any, next: any) => {
        const token = this.extractToken(req);
        if (!token) return this.unauthorized(res, 'no_token');

        const secret = process.env.SECRET_KEY;
        if (!secret) return this.unauthorized(res, 'invalid_token');

        try {
            const decoded: any = jwt.verify(token, secret);
            req.body.user = decoded;
            next();
        } catch (err: any) {
            if (this.isTokenExpiredError(err)) {
                return this.unauthorized(res, 'token_expired');
            }
            return this.unauthorized(res, 'invalid_token');
        }
    };
}