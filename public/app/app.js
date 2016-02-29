System.register(['angular2/core', 'angular2/common', 'angular2/router', './components/welcome/welcome.component', './components/todos/todos.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, welcome_component_1, todos_component_1;
    var templateUrl, App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (welcome_component_1_1) {
                welcome_component_1 = welcome_component_1_1;
            },
            function (todos_component_1_1) {
                todos_component_1 = todos_component_1_1;
            }],
        execute: function() {
            templateUrl = 'app/app.html';
            App = (function () {
                function App(router, location) {
                    this.router = router;
                    this.location = location;
                }
                App = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        encapsulation: core_1.ViewEncapsulation.Emulated,
                        templateUrl: templateUrl,
                        directives: [
                            common_1.CORE_DIRECTIVES,
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Welcome', component: welcome_component_1.WelcomeComponent },
                        { path: '/todos', name: 'Todos', component: todos_component_1.TodosComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location])
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map