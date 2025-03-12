import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import 'reflect-metadata'; // Requerido para o TypeORM

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
    database: process.env['DATABASE_SCHEMA'],
});

export default AppDataSource;