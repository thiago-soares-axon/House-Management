import { User } from "../authentication/User";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>;
        }
    }
}