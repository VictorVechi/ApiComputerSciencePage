import { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IRoleApp } from '../../domain/application/IRoleApp';
import { IRoleController } from '../../domain/controller/IRoleController';

@injectable()
export default class RoleController implements IRoleController {
    constructor(
        @inject(DependencyEnum.ROLE_APPLICATION) private roleApplication: IRoleApp
    ){}

    routes(app: Express) {
        app.post('/api/roles/register', async (req, res) => {
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
    }
}