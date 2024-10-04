import express from "express";
import DependencyInjector from "../DependencyInjection/DependencyInjector";
import UserController from "./UserController";

DependencyInjector.register();

const app = express();
app.use(express.json());

UserController.routes(app);

export default app;