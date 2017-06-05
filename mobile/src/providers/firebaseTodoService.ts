import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'; import 'rxjs/add/operator/map';
import {Todo} from '../domain/todo';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

/**
 * Angular Firebase DAO service
*/

@Injectable()
export class FirebaseTodoService {
  public todos:FirebaseListObservable<any>;

  constructor(public http:Http, public af:AngularFire) {
    console.log('Hello TodoService Provider');
  }    // Get all todos

  load():FirebaseListObservable<Todo[]> {
    this.todos = this.af.database.list('/todos');
    return this.todos;
  }

  // Add a todo-edit
  add(todo:string) : boolean {
    let todoItem:Todo = new Todo(todo);
    this.todos.push(todoItem);
    return true;
  }

  // Update a todo
  update(itemId:string, todo:Todo) {
    this.todos.update(itemId, {description: todo.description, isComplete: todo.isComplete});
    this.todos.update(itemId, todo);
  }

  // Delete a todo
  delete(itemId:string) {
    this.todos.remove(itemId);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
