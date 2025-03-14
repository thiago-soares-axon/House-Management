import { authMiddleware } from "../middlewares/auth/authMiddlewares";
import { LoginController } from "../controllers/userController/loginController";
import { UserController } from "../controllers/userController/userController";
import { Router } from "express";

const routes = Router();

const userController = new UserController();
const loginController = new LoginController();

routes.post('/user/create', userController.createUser.bind(userController));
routes.post('/user/login', loginController.loginUser.bind(loginController));

routes.use(authMiddleware);
routes.get('/user/getProfile', loginController.getProfileUser.bind(loginController));

export default routes;