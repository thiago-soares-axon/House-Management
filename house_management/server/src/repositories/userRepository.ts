import AppDataSource from '../config/AppDataSource';
import { User } from '../database/entities/User';

export const userRepository = AppDataSource.getRepository(User);

