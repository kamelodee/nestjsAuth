import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Todo } from 'src/todo/todo.entity';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    @HasMany(() => Todo)
    todo: Todo[]
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    
}