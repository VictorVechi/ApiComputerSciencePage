import { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IJwtService } from '../../domain/service/IJwtService';
import { IUserController } from '../../domain/controller/IUserController';
import { IUserApp } from '../../domain/application/IUserApp';

@injectable()
export default class UserController implements IUserController {

    constructor(
        @inject(DependencyEnum.JWT_SERVICE) private jwtService: IJwtService,
        @inject(DependencyEnum.USER_APPLICATION) private userApplication: IUserApp
    ){}

    routes(app: Express) {

        app.post('/api/user/register', async (req, res) => {
            try {
                const data = req.body;
                const user = await this.userApplication.create(data);
                if (user) {
                    res.status(200).send({ message: 'User registered successfully' });    
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error registering user' });
            }
        });

        app.post('/api/user/login', async (req, res) => {
            try{
                const data = req.body;
                const response = await this.userApplication.login(data)
                if (response && response.token){
                    res.status(200).send({ message: 'User logged in successfully', response});
                } else {
                    res.status(400).send({ error: "Invalid Login"});
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error logging in user' });
            }
        });

        app.get('/api/user/:id', this.jwtService.checkAdminToken, async (req, res) => {
            try {
                const id: any = req.params.id;
                
                const user = await this.userApplication.findById(id);   
                
                if (user) {
                    res.status(200).send({ user });
                } else {
                    res.status(400).send({ error: 'User not found' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error updating user' });
            }
        });

        app.get('/api/users', this.jwtService.checkAdminToken, async (_req, res) => {
            try {
                const users = await this.userApplication.findUsers();
                if (users) {
                    res.status(200).send({ users });
                } else {
                    res.status(400).send({ error: 'Users not found' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error updating user' });
            }
        });

        app.put('/api/user/recover', this.jwtService.checkToken, async (req, res) => {
            try {
                const data = req.body;
                const user = await this.userApplication.updatePassword(data);
                if (user) {
                    res.status(200).send({ message: 'Password updated successfully' });
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error updating password' });
            }
        });

        app.put('/api/user/update', this.jwtService.checkToken, async (req, res) => {
            try {
                const data = req.body;
                const user = await this.userApplication.update(data);
                if (user) {
                    res.status(200).send({ message: 'User updated successfully' });
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error updating user' });
            }
        });

        app.delete('/api/user/delete', this.jwtService.checkAdminToken, async (req, res) => {
            try {
                const data = req.body;
                const response = await this.userApplication.delete(data);

                if (response){
                    res.status(200).send({ message: 'User deleted', response });
                } else {
                    res.status(400).send({ message: "Unable to delete user"})
                }
                
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error deleting user' });
            }
        });
    }
}