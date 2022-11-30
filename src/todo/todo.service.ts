import { Injectable, Inject } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoDto } from './todo.dto';
import { TODO_REPOSITORY } from '../constants';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodoService {

    constructor(@Inject(TODO_REPOSITORY) private readonly todoRepository: typeof Todo) { }

   
    async create(todo: TodoDto,userId): Promise<Todo> {
     
        return await this.todoRepository.create<Todo>({ ...todo, userId });
    }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.findAll<Todo>({
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }

    async findOne(id): Promise<Todo> {
        return await this.todoRepository.findOne({
            where: { id },
            include: [{ model: User, attributes: { exclude: ['password'] } }],
        });
    }

    async delete(id,userId) {
        return await this.todoRepository.destroy({ where: { id ,userId} });
    }

    async update(id, data,userId) {
        const [numberOfAffectedRows, [updatedTodo]] = await this.todoRepository.update({ ...data }, { where: { id,userId}, returning: true });
        return { numberOfAffectedRows, updatedTodo };
    }
}