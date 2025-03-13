import 'reflect-metadata'; // Requerido para o TypeORM
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Category } from '../entities/Category';
import { Expense } from '../entities/Expense';
import { Income } from '../entities/Income';
import { Transaction } from '../entities/Transaction';
import { User } from '../entities/User';

dotenv.config({ path: '../.env' });

const databaseType = process.env['DB_TYPE'] as 'mysql' | 'postgres' | undefined;

if (!databaseType) {
    console.log(`Valor datatype: ${databaseType}`);
    throw new Error("A variável de ambiente DATABASE_TYPE não está definida.");
}

const AppDataSource = new DataSource({
    type: databaseType,
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    username: process.env['DB_USER'],
    password: process.env['DB_PASS'],
    database: process.env['DB_SCHEMA'],
    entities: [Category, Expense, Income, Transaction, User],
    migrations: [__dirname + '/../migrations/*.ts'],
});

console.log('DataSource instanciado:', AppDataSource);

export default AppDataSource;