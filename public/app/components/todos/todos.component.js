System.register(['angular2/core', 'angular2/common', '../../services/todo.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, todo_service_1;
    var templateUrl, TodosComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            }],
        execute: function() {
            templateUrl = 'app/components/todos/todos.html';
            TodosComponent = (function () {
                function TodosComponent(_todoService) {
                    this._todoService = _todoService;
                }
                TodosComponent.prototype.ngOnInit = function () {
                    this.getTodos();
                };
                TodosComponent.prototype.getTodos = function () {
                    var _this = this;
                    this._todoService.fetchAll()
                        .subscribe(function (d) {
                        _this.todos = d.results;
                    });
                };
                TodosComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        // moduleId: module.id,
                        // template: '<h1>My First Angular 2 App</h1>'
                        templateUrl: templateUrl,
                        directives: [
                            common_1.CORE_DIRECTIVES
                        ],
                        providers: [
                            todo_service_1.TodoService
                        ]
                    }), 
                    __metadata('design:paramtypes', [todo_service_1.TodoService])
                ], TodosComponent);
                return TodosComponent;
            })();
            exports_1("TodosComponent", TodosComponent);
        }
    }
});
//# sourceMappingURL=todos.component.js.map