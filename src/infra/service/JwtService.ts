import { inject, injectable } from "tsyringe";
import jwt from 'jsonwebtoken';
import { IUser, IUserAdapted } from "../../domain/repository/model/IUser";
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import Role from "../../application/Role";
import { IJwtService } from "../../domain/service/IJwtService";

@injectable()
export default class JwtService implements IJwtService{
    constructor(
        @inject(DependencyEnum.ROLE_APPLICATION) private roleApplication: Role
    ){}
    private secretKey = process.env.SECRET_KEY;

    public async generateToken(data: IUserAdapted): Promise<string | null> {
        const role = await this.roleApplication.execute(data.id_cargo);

        if(this.secretKey !== undefined && role !== null){
            return jwt.sign({
                id: data.id,
                name: data.name,
                email: data.email,
                cargo: role.roleName
            }, this.secretKey);
        }
        return null;
    }

    public checkToken(req: any, res: any, next: any) {
        try{
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send({ error: 'Unauthorized' });
            }

            const secret = process.env.SECRET_KEY;

            if(secret !== undefined){
                jwt.verify(token, secret)
                next();
            }
        } catch (err) {
            console.error(err);
            res.status(401).send({ error: 'Unauthorized' });
        }
    }

}