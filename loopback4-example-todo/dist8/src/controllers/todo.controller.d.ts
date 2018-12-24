import { TodoRepository } from '../repositories';
import { Todo } from '../models';
export declare class TodoController {
    protected todoRepo: TodoRepository;
    constructor(todoRepo: TodoRepository);
    createTodo(todo: Todo): Promise<Todo>;
    findTodoById(id: number, items?: boolean): Promise<Todo>;
    findTodos(): Promise<Todo[]>;
    replaceTodo(id: number, todo: Todo): Promise<boolean>;
    updateTodo(id: number, todo: Todo): Promise<boolean>;
    deleteTodo(id: number): Promise<boolean>;
}
