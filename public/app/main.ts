/**
 * Created by shigeru on 16/02/21.
 */
import {bootstrap}      from 'angular2/platform/browser';
import {TodosComponent} from './components/todos/todos.component';
import {TodoService}    from './services/todo.service';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(TodosComponent, [TodoService, HTTP_PROVIDERS]);
