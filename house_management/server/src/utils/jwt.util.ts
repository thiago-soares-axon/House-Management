import jwt from 'jsonwebtoken';

const SECRET_JWT: string = process.env.JWT_PASS || 'default_secret';

export const generateToken = (payload: object) => {
    return jwt.sign(payload, SECRET_JWT, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET_JWT);
    } catch (error) {
        return null;
    }
};

export const decodeToken = (token: string) => {
    return jwt.decode(token);
};