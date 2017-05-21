import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo';

const templateUrl = 'app/components/todos/todos.html';


@Component({
  // selector: 'my-app',
  selector: 'todos_component',
  // moduleId: module.id,
  // template: '<h1>My First Angular 2 App</h1>'
  inputs: ['todos'],
  templateUrl: templateUrl,
  directives: [
    CORE_DIRECTIVES
  ],
  providers: [
    TodoService
  ]
})
export class TodosComponent implements OnInit {
  public todos: Array<Todo> = [];
  constructor(public _todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this._todoService.fetchAll()
      .subscribe( data => {
        this.todos = data.results;
        console.log(this.todos);
      });
  }
}
