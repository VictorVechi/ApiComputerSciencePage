import { Express } from 'express';
import bcrypt from 'bcrypt';
import { container } from 'tsyringe';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IUserValidationServices } from '../../domain/repository/service/IUserValidationService';
import UserRepository from '../repository/UserRepository';
import jwt from 'jsonwebtoken';
export default class UserController {

    static routes(app: Express) {
        app.get('/users', async (req, res) => {
            res.send('Users');
        });

        app.post('/api/user/register', async (req, res) => {
            try {
                const data = req.body;
                const validate = container.resolve<IUserValidationServices>(DependencyEnum.USER_VALIDATION_SERVICE);
                const userRepository = container.resolve<UserRepository>(DependencyEnum.USER_REPOSITORY);
                if (await validate.validateRegister(data)){
                    const salt = await bcrypt.genSalt(12);
                    const passwordHash = await bcrypt.hash(data.password, salt);
                    await userRepository.create({ ...data, password: passwordHash });

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
                const validation = container.resolve<IUserValidationServices>(DependencyEnum.USER_VALIDATION_SERVICE);
                const validate = await validation.validateLogin(data);
                const secret = process.env.SECRET_KEY 

                if(validate.login && secret !== undefined){
                    const token = jwt.sign({ id: validate.user?._id }, secret);
                    res.status(200).send({ message: 'User logged in successfully', token });
                } else {
                    res.status(400).send({ error: validate.error});
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error logging in user' });
            }
        });

        app.get('/api/user/:id', this.checkToken, async (req, res) => {
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

    private static checkToken(req: any, res: any, next: any) {
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
            res.status(500).send({ error: 'Error checking token' });
        }
    }
}