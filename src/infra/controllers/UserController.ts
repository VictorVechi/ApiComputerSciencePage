import { Express } from 'express';
import bcrypt from 'bcrypt';
import { container } from 'tsyringe';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IUserValidationServices } from '../../domain/repository/service/IUserValidationService';
import UserRepository from '../repository/UserRepository';
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
                }
                res.status(400).send({ error: 'Invalid data' });
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error registering user' });
            }
        });
    }
}