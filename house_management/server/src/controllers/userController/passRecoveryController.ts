import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "../../services/user.service";
import * as dotenv from "dotenv";
import { verifyToken } from "../../utils/jwt.util";

dotenv.config();

export class PassRecoveryController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async passRecovery(req: Request, res: Response): Promise<Response> {
        try {
            const { token } = req.query;
            const { newPassword } = req.body;

            if (!token || !newPassword) {
                return res.status(400).json({ message: "Dados inválidos" });
            }

            let payload;

            try {
                payload = verifyToken(token as string) as { id: number };
            } catch (err) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }

            const userID = await this.userService.findUserByID(payload.id);

            if (!userID) {
                return res.status(404).json({ message: "User not found" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            userID.password = hashedPassword;
            await this.userService.updateUserPassword(userID.id, hashedPassword);

            return res.status(200).json({ message: "Password successfully updated" });
        } catch (error) {
            console.error("Error resetting password:", error);
            return res.status(500).json({ message: "Failed to reset password" });
        }
    }
}