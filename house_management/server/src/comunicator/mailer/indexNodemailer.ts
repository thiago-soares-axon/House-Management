import { Request, Response } from "express";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import UserService from "../../services/user.service";
import { generateToken } from "../../utils/jwt.util";

dotenv.config();

export class SendEmail {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async setEmail(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email inválido" });
            }

            const verifyEmailUser = await this.userService.findUserByEmail(email);
            if (!verifyEmailUser) {
                return res.status(400).json({ message: "Email inválido" });
            }

            const token = generateToken({ id: verifyEmailUser.id, email: verifyEmailUser.email });

            const transporter = nodemailer.createTransport({
                host: "smtp.mail.yahoo.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAILER_USER,
                    pass: process.env.MAILER_PASS,
                },
            });

            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

            await transporter.sendMail({
                from: process.env.MAILER_USER,
                to: email,
                subject: "Password Reset",
                text: `Click the link below to reset your password:\n\n${resetLink}`,
            });

            // Responder apenas depois de garantir que o e-mail foi enviado
            return res.status(200).json({ message: "Email enviado com sucesso" });

        } catch (error) {
            console.error("Error sending email: ", error);

            if (!res.headersSent) {
                return res.status(500).json({ message: "Failed to send email" });
            }

            return res;
        }
    }
}
