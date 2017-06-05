import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Todo} from '../domain/todo';

/*
  Generated class for the TodoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MongoTodoService {
  todosUrl = "http://localhost:8080/api/todos"

  constructor(public http: Http) {
    console.log('Hello TodoService Provider');
  }

  // Get all todos
  load(): Observable<Todo[]> {
    return this.http.get(this.todosUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  // Add a todo-edit
  add(todo: string, todos : Todo[]): Observable<Todo> {
    let newTodo = new Todo(todo);
    let body = JSON.stringify(newTodo);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.todosUrl, body, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
    }

  // Update a todo
  update(itemId:string, todo:Todo) {
    let url = `${this.todosUrl}/${todo._id}`; //see mdn.io/templateliterals
    let body = JSON.stringify(todo)
    let headers = new Headers({'Content-Type': 'application/json'});

    this.http.put(url, body, {headers: headers})
      .map(() => todo) //See mdn.io/arrowfunctions
      .catch(this.handleError).subscribe(response => {
          console.log('Update invoked');
      });
  }

  // Delete a todo
  delete(todo:Todo, index : number, todos : Todo[]) {
    let url = `${this.todosUrl}/${todo._id}`;
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.delete(url, headers)
      .catch(this.handleError).subscribe(response => {
        console.log('Delete invoked');
        todos.splice(index, 1);
      });
  }
}
