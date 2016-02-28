import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo';

const templateUrl = 'app/components/todos/todos.html';


@Component({
  selector: 'my-app',
  // moduleId: module.id,
  // template: '<h1>My First Angular 2 App</h1>'
  templateUrl: templateUrl,
  directives: [
    CORE_DIRECTIVES
  ],
  providers: [
    TodoService
  ]
})

export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private _todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this._todoService.fetchAll()
      .subscribe( d=> {
        this.todos = d.results;
      });
  }
}
