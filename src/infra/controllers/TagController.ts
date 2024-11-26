import { inject, injectable } from "tsyringe";
import { ITagController } from "../../domain/controller/ITagController";
import { Express } from 'express';
import { DependencyEnum } from "../DependencyInjection/DependencyEnum";
import { IJwtService } from "../../domain/service/IJwtService";
import { ITagApp } from "../../domain/application/ITagApp";

@injectable()
export default class TagController implements ITagController {

    constructor(
        @inject(DependencyEnum.TAG_APPLICATION) private tagApplication: ITagApp,
        @inject(DependencyEnum.JWT_SERVICE) private jwtService: IJwtService
    ){}

    routes(app: Express):void {
        app.post('/api/tag/create', this.jwtService.checkAdminToken, async (req, res) => {
            try {
                const data = req.body;
                const tag = await this.tagApplication.create(data);
                if (tag) {
                    res.status(200).send({ message: 'Tag created successfully' });
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error creating tag' });
            }
        });

        app.get('/api/tag/search/:name', this.jwtService.checkToken, async (req, res) => {
            try {
                const name: any = req.params.name;
                if(name){
                    const tag = await this.tagApplication.findByName(name);
                    if (tag) {
                        res.status(200).send({ tag });
                    } else {
                        res.status(400).send({ error: 'Tag not found' });
                    }
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error finding tag' });
            }
        });

        app.get('/api/tag', this.jwtService.checkToken, async (_req, res) => {
            try {
                const tags = await this.tagApplication.findTags();
                res.status(200).send({ tags });
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error finding tags' });
            }
        });

        app.put('/api/tag/:id', this.jwtService.checkAdminToken, async (req, res) => {
            try {
                const data = req.body;
                const id:any = req.params.id;
                const tag = await this.tagApplication.update(id, data);
                if (tag) {
                    res.status(200).send({ message: 'Tag updated successfully' });
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error updating tag' });
            }
        })

        app.delete('/api/tag/:id', this.jwtService.checkAdminToken, async (req, res) => {
            try {
                const id:any = req.params.id;
                const tag = await this.tagApplication.delete(id);
                if (tag) {
                    res.status(200).send({ message: 'Tag deleted successfully' });
                } else {
                    res.status(400).send({ error: 'Invalid data' });
                }
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Error deleting tag' });
            }
        })
    }
}