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

        app.get('/api/roles', this.jwtService.checkAdminToken, async (_req, res) => {
            try {
                const roles = await this.roleApplication.searchAll();
                if (roles) {
                    res.status(200).send({ roles });
                } else {
                    res.status(400).send({ error: 'Roles not found' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error searching roles' });
            }
        });

        app.put('/api/roles/:id', this.jwtService.checkAdminToken, async (req, res) => {
            try {
                const data = req.body;
                const id: any = req.params.id;
                const result = await this.roleApplication.update(id, data);
                if (result) {
                    res.status(200).send({ message: 'Role updated successfully' });
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error updating role' });
            }
        });
    }
}