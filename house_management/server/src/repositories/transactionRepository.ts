import AppDataSource from "config/AppDataSource";
import { Transaction } from "database/entities/Transaction";

export const transictionRepository = AppDataSource.getRepository(Transaction);