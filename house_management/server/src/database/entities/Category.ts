import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';
import { Income } from './Income';
import { Expense } from './Expense';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text', { nullable: true })
    description?: string;

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[];

    @OneToMany(() => Income, (income) => income.category)
    incomes: Income[];

    @OneToMany(() => Expense, (expense) => expense.category)
    expenses: Expense[];
}