import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Income } from './Income';
import { Expense } from './Expense';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column('decimal', { default: 0 })
    balance: number;

    @OneToMany(() => Income, (income) => income.user)
    incomes: Income[];

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses: Expense[];
}