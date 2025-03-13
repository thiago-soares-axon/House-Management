import { UserController } from "../controllers/userController/userController";
import { Router, Request, Response } from "express";


const routes = Router();

const createUser = new UserController().createUser.bind(new UserController());

routes.post('/user/create', createUser);


export default routes;