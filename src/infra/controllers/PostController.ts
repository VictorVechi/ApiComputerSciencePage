import { inject, injectable } from 'tsyringe';
import { Express } from 'express';
import { IPostController } from '../../domain/controller/IPostController';
import { DependencyEnum } from '../DependencyInjection/DependencyEnum';
import { IPostApp } from '../../domain/application/IPostApp';
import { IJwtService } from '../../domain/service/IJwtService';

@injectable()
export default class PostController implements IPostController {
    constructor(
        @inject(DependencyEnum.POST_APPLICATION) private postApplication: IPostApp,
        @inject(DependencyEnum.JWT_SERVICE) private jwtApplication: IJwtService 
    ){}

    routes(app: Express) {

        app.get('/api/posts', this.jwtApplication.checkToken, async (_req, res) => {
            try {
                const posts = await this.postApplication.searchAll();
                if (posts) {
                    res.status(200).send(posts);
                } else {
                    res.status(400).send({ error: 'Posts not found' });
                }
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Error searching posts' });
            }
        });

        app.post('/api/posts/create', this.jwtApplication.checkToken, async (req, res) => {
            try {
                const data = req.body;
                const post = await this.postApplication.create(data);
                if (post) {
                    res.status(200).send({ message: 'Post created successfully' });
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Error creating post' });
            }
        });

        app.post('/api/posts/search', this.jwtApplication.checkToken, async (req, res) => {
            try {
                const data = req.body;
                const posts = await this.postApplication.search(data);
                if (posts) {
                    res.status(200).send(posts);
                } else {
                    res.status(400).send({ error: 'Post not found' });
                }
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Error searching post' });
            }
        });
    
        app.put('/api/posts/:id', this.jwtApplication.checkToken, async (req, res) => {
            try {
                const data = req.body;
                const id: any = req.params.id;
                const result = await this.postApplication.update(id, data);
                if (result) {
                    res.status(200).send({ message: 'Post updated successfully' });
                } else {
                    res.status(400).send({ error: 'Post not found' });
                }
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: 'Error updating post' });
            }
        });

        app.delete('/api/posts/:id', this.jwtApplication.checkToken, async (req, res) => {
            try{
                const id: any = req.params.id;
                const result = await this.postApplication.delete(id);
                
                if (result) {
                    res.status(200).send({ message: 'Post deleted successfully' });
                } else {
                    res.status(400).send({ error: 'Post not found' });
                }
            } catch (err) {
                console.log(err)
                res.status(500).send({ error: 'Error deleting post' }); 
            }
        });

    }
}