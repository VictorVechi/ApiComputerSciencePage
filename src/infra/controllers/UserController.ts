import { Express } from 'express';
import { container, inject, injectable } from 'tsyringe';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import UserRepository from '../repository/UserRepository';
import { IJwtService } from '../../domain/service/IJwtService';
import User from '../../application/User';
import { IUserController } from '../../domain/controller/IUserController';
import { IUserApp } from '../../domain/application/IUserApp';

@injectable()
export default class UserController implements IUserController {

    constructor(
        @inject(DependencyEnum.JWT_SERVICE) private jwtService: IJwtService,
        @inject(DependencyEnum.USER_APPLICATION) private userApplication: IUserApp
    ){}

    routes(app: Express) {
        app.get('/users', async (req, res) => {
            res.send('Users');
        });

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
                const userRepository = container.resolve<UserRepository>(DependencyEnum.USER_REPOSITORY);
                
                const user = await userRepository.findById(id);

                res.status(200).send({ message: 'User found', user });
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error updating user' });
            }
        });
    }
}