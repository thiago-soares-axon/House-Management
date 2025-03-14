import { authMiddleware } from "../middlewares/auth/authMiddlewares";
import { LoginController } from "../controllers/userController/loginController";
import { UserController } from "../controllers/userController/userController";
import { SendEmail } from "../comunicator/mailer/indexNodemailer";
import { PassRecoveryController } from "../controllers/userController/passRecoveryController";
import { Router } from "express";

const routes = Router();

const userController = new UserController();
const loginController = new LoginController();
const sendEmail = new SendEmail();
const passRecovery = new PassRecoveryController();

routes.post('/user/create', userController.createUser.bind(userController));
routes.post('/user/login', loginController.loginUser.bind(loginController));
routes.post('/sendEmail', sendEmail.setEmail.bind(sendEmail));
routes.post('/passwordRecovery', passRecovery.passRecovery.bind(passRecovery));


routes.use(authMiddleware);
routes.get('/user/getProfile', loginController.getProfileUser.bind(loginController));

export default routes;