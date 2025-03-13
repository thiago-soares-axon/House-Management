import AppDataSource from "config/AppDataSource";
import { Income } from "entities/Income";

export const incomeRepository = AppDataSource.getRepository(Income);