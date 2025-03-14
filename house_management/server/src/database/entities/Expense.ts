import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Expense {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    amount: number;

    @Column('date')
    date: string;

    @ManyToOne(() => Category, (category) => category.expenses)
    category: Category;

    @ManyToOne(() => User, (user) => user.expenses)
    user: User;
}