import { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IRoleApp } from '../../domain/application/IRoleApp';
import { IRoleController } from '../../domain/controller/IRoleController';
import { IJwtService } from '../../domain/service/IJwtService';

@injectable()
export default class RoleController implements IRoleController {
    constructor(
        @inject(DependencyEnum.ROLE_APPLICATION) private roleApplication: IRoleApp,
        @inject(DependencyEnum.JWT_SERVICE) private jwtService: IJwtService
    ){}

    routes(app: Express) {
        app.post('/api/roles/register', this.jwtService.checkAdminToken ,async (req, res) => {
            try {
                const data = req.body;
                const role = await this.roleApplication.create(data);
                if (role) {
                    res.status(200).send({ message: 'Role registered successfully' });
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error registering role' });
            }
        });

        app.get('/api/roles', this.jwtService.checkAdminToken, async (req, res) => {
            try {
                const roles = await this.roleApplication.searchAll();
                res.status(200).send({ roles });
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error searching roles' });
            }
        });
    }
}