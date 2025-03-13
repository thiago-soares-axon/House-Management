import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    amount: number;

    @ManyToOne(() => User, (user) => user.incomes)
    user: User;

    @ManyToOne(() => Category, (category) => category.incomes)
    category: Category;

    @Column('date')
    date: string;
}