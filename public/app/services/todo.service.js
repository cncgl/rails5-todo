System.register(['angular2/core', 'angular2/http', '../models/todo', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, todo_1;
    var TodoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (todo_1_1) {
                todo_1 = todo_1_1;
            },
            function (_1) {}],
        execute: function() {
            TodoService = (function () {
                function TodoService(_http) {
                    this._http = _http;
                }
                TodoService.prototype.fetchAll = function () {
                    return this._http
                        .get('/api/todos')
                        .map(function (r) { return r.json(); })
                        .map(function (r) {
                        var results = [];
                        if (r.results) {
                            results = r.results.map(function (v) { return new todo_1.Todo(v); });
                        }
                        console.log(results);
                        return { results: results };
                    });
                };
                TodoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TodoService);
                return TodoService;
            })();
            exports_1("TodoService", TodoService);
        }
    }
});
//# sourceMappingURL=todo.service.js.map