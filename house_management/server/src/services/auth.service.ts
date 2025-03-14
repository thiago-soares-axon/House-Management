import { generateToken, verifyToken } from '../utils/jwt.util';
import { User } from '../database/entities/User';
import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

import { JwtPayload } from 'jsonwebtoken';



export default class AuthService {
    private userRepository = userRepository

    async loginUser(email: string, password: string): Promise<{ token: string, user: Partial<User> } | null> {

        //Verificar se o usuário existe
        const userExists = await this.userRepository.findOne({ where: { email } });

        if (!userExists) {
            return null;
        }

        //Verificar senha
        const passMatch = await bcrypt.compare(password, userExists.password);

        if (!passMatch) {
            return null;
        }

        const token = generateToken({ id: userExists.id, email: userExists.email })

        return {
            token,
            user: { id: userExists.id, name: userExists.name, email: userExists.email }
        };
    }

    async verifyUserLogin(authorization?: string): Promise<Partial<User> | null> {
        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];  // Extrai o token do header

            // Usa a função verifyToken para decodificar e verificar o token
            const decoded = verifyToken(token) as JwtPayload;

            if (!decoded?.id) {
                return null;
            }

            // Verifica se o usuário existe
            const userExists = await this.userRepository.findOneBy({ id: decoded.id });

            if (!userExists) {
                return null;
            }

            // Remove a senha antes de retornar o usuário
            const { password: _, ...loggedUser } = userExists;
            return loggedUser;  // Retorna o usuário sem a senha

        } catch (error) {
            return null;
        }
    }
}