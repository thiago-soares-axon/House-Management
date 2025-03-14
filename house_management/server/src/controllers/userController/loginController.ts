import AuthService from "../../services/auth.service";
import { Request, Response } from 'express';

export class LoginController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService();
    }
    async loginUser(req: Request, res: Response): Promise<Response> {

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }

            const authResult = await this.authService.loginUser(email, password);

            if (!authResult) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            return res.status(200).json(authResult);

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

    }

    async getProfileUser(req: Request, res: Response): Promise<Response> {

        return res.status(200).json(req.user);
    }
}