// app/pages/todo-edit/todo-edit.ts
import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {Todo} from '../../domain/todo';
import {MongoTodoService} from '../../providers/mongoTodoService';

@Component({
  selector: 'page-todo-edit',
  templateUrl: 'todo-edit.html',
  providers: [MongoTodoService]
})
export class TodoEditPage {
  public todo: Todo;    // The todo itself
  public todos: Todo[]; // The list of todos from the main page
  public key: string; // The index of the todo we're looking at

  constructor(public todoService: MongoTodoService, public nav: NavController, public navParams: NavParams ) {
    this.todo = navParams.get('todo');
    this.todos = navParams.get('todos');
    this.key = navParams.get('key');
  }

  saveTodo(key:string, updatedDescription: string) {
    //this.todo.description = updatedDescription;
    //this.todoService.update(key, this.todo);
    this.nav.pop();

    //.subscribe(response => {
       // go back to todo list
    //});
  }

  deleteTodo() {
    //this.todoService.delete(this.key);
    //.subscribe(response => {
    //  this.todos.splice(this.index, 1); // remove the todo
    //});
    this.nav.pop(); //go back to todo list
  }

  back() {
    this.nav.pop();
  }
}
