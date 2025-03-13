import AppDataSource from '../config/AppDataSource';
import { User } from '../entities/User';

export const userRepository = AppDataSource.getRepository(User);