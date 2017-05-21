import { ViewEncapsulation, Component } from '@angular/core';
// import { CORE_DIRECTIVES } from '@angular/common';
import { NgClass, NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
// import { ROUTER_DIRECTIVES, Router, RouteConfig, Location, Instruction } from '@angular/router';
import { RouterModule, Router, Location } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { TodosComponent } from './components/todos/todos.component';

const templateUrl = 'app/app.html';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: templateUrl
  // directives: [
  //  CORE_DIRECTIVES,
  //  ROUTER_DIRECTIVES
  // ]
})
@RouteConfig([
  { path: '/',      name: 'Welcome', component: WelcomeComponent },
  { path: '/todos', name: 'Todos',   component: TodosComponent }
])
export class App {
  router: Router;
  location: Location;

  constructor(router: Router, location: Location) {
    this.router = router;
    this.location = location;
  }
}
