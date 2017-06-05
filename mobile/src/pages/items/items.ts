import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Todo} from '../../domain/todo';
import { TodoEditPage } from '../todo-edit/todo-edit';

import {MongoTodoService} from '../../providers/mongoTodoService';
// import {FirebaseTodoService} from '../../providers/firebaseTodoService';

@Component({
    selector: 'page-items',
    templateUrl: 'items.html',
    providers: [MongoTodoService]
})
export class ItemsPage {
  public todos:Todo[];

  constructor(public nav:NavController, public todoService:MongoTodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.load().subscribe(data => {
      this.todos = data;
    })
  }

  addTodo(todo:string) {
    if (todo === "") {
      return;
    }
    this.todoService.add(todo, this.todos).subscribe(response => {
      this.loadTodos();
    });
  }

  toggleComplete(key:string, todo:Todo) {
    todo.isComplete = !todo.isComplete;
    this.todoService.update(key, todo);
  }

  deleteTodo(todo:Todo, index:number) {
    this.todoService.delete(todo, index, this.todos);
  }

  navToEdit(todo:Todo, key:string) {
    console.log('key: ' + key);
    this.nav.push(TodoEditPage, {todo: todo, todos: this.todos, key: key});
  }
}
