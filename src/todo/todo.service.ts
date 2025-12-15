import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  create(createTodoDto: CreateTodoDto) {
    const todo: Todo = {
      id: this.idCounter++,
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: false,
      createdAt: new Date(),
    };

    this.todos.push(todo);
    return todo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  update(id: number, data: Partial<Todo>) {
    const todo = this.findOne(id);

    Object.assign(todo, data);
    return todo;
  }

  remove(id: number) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    const [deletedTodo] = this.todos.splice(index, 1);
    return deletedTodo;
  }

  toggleComplete(id: number) {
    const todo = this.findOne(id);
    todo.completed = !todo.completed;
    return todo;
  }

  search(keyword: string) {
    return this.todos.filter(
      (todo) =>
        todo.title.includes(keyword) || todo.description?.includes(keyword),
    );
  }
}
