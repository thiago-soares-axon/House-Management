import AppDataSource from "config/AppDataSource";
import { Expense } from "entities/Expense";

export const expenseRepository = AppDataSource.getRepository(Expense);