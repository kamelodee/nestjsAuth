import { Todo } from './todo.entity';
import { TODO_REPOSITORY } from '../constants';


export const todoProviders = [{
    provide: TODO_REPOSITORY,
    useValue: Todo,
}];