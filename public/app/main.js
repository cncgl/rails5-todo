System.register(['angular2/platform/browser', './components/todos/todos.component', './services/todo.service', 'angular2/http'], function(exports_1) {
    var browser_1, todos_component_1, todo_service_1, http_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (todos_component_1_1) {
                todos_component_1 = todos_component_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(todos_component_1.TodosComponent, [todo_service_1.TodoService, http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map