import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserService from "../../services/user.service";


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password, balance } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            }

            // Verificar se o usuário já existe
            const verifyExistsUser = await this.userService.findUserByEmail(email);
            if (verifyExistsUser) {
                return res.status(409).json({ message: 'Usuário já existe' });
            }

            // Hash da senha antes de salvar no banco
            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await this.userService.createUser({
                name,
                email,
                password: hashPassword,
                balance: balance || 0
            });

            return res.status(201).json({ message: 'Usuário criado com sucesso!' });

        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}