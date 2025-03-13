import { Category } from 'entities/Category';
import AppDataSource from '../config/AppDataSource';

export const categoryRepository = AppDataSource.getRepository(Category);