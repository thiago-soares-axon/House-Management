import AppDataSource from "config/AppDataSource";
import { Income } from "database/entities/Income";

export const incomeRepository = AppDataSource.getRepository(Income);