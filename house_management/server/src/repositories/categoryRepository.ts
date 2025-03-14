import { Category } from 'database/entities/Category';
import AppDataSource from '../config/AppDataSource';

export const categoryRepository = AppDataSource.getRepository(Category);