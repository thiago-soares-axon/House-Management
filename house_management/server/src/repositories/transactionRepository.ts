import AppDataSource from "config/AppDataSource";
import { Transaction } from "entities/Transaction";

export const transictionRepository = AppDataSource.getRepository(Transaction);