import {ViewEncapsulation, Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

const templateUrl = 'app/components/welcome/welcome.html';

@Component({
  // selector: 'my-app',
  moduleId: 'app-welcome',
  templateUrl: templateUrl,
  directives: [
    CORE_DIRECTIVES
  ]
})

export class WelcomeComponent {}
