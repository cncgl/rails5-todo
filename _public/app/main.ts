/**
 * Created by shigeru on 16/02/21.
 */
import { bootstrap }      from 'angular2/platform/browser';
import { TodosComponent } from './components/todos/todos.component';
import { TodoService }    from './services/todo.service';
import { HTTP_PROVIDERS } from 'angular2/http';
import { FORM_PROVIDERS } from 'angular2/common';
import { provide, enableProdMode } from 'angular2/core';
import {
  ROUTER_PRIMARY_COMPONENT,
  APP_BASE_HREF,
  ROUTER_PROVIDERS as NG2_ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

import { App } from './app';

const ROUTER_PROVIDERS: Array<any> = [
  NG2_ROUTER_PROVIDERS,
  provide(ROUTER_PRIMARY_COMPONENT, {
    useValue: App
  }),
  provide(LocationStrategy, {
    useClass: HashLocationStrategy
  }),
  provide(APP_BASE_HREF, {
    useValue: '/'
  })
];

const APP_PROVIDERS: Array<any> = [
  HTTP_PROVIDERS,
  FORM_PROVIDERS,
  ROUTER_PROVIDERS,
  TodoService
];

// bootstrap(TodosComponent, [TodoService, HTTP_PROVIDERS]);
bootstrap(App, [APP_PROVIDERS]);
