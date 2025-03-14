import AppDataSource from "config/AppDataSource";
import { Expense } from "database/entities/Expense";

export const expenseRepository = AppDataSource.getRepository(Expense);