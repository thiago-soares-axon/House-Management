
import { Request, Response, NextFunction } from "express";
import { userRepository } from "repositories/userRepository";
import jwt from 'jsonwebtoken';
import AuthService from "../../services/auth.service";

const authService = new AuthService();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            res.status(401).json({ message: "Unauthorized" });
        }

        // Verifica o token e busca o usuário autenticado
        const user = await authService.verifyUserLogin(authorization);

        if (!user) {
            res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
