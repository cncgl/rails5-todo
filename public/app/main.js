System.register(['angular2/platform/browser', './services/todo.service', 'angular2/http', 'angular2/common', 'angular2/core', 'angular2/router', './app'], function(exports_1) {
    var browser_1, todo_service_1, http_1, common_1, core_1, router_1, app_1;
    var ROUTER_PROVIDERS, APP_PROVIDERS;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            ROUTER_PROVIDERS = [
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, {
                    useValue: app_1.App
                }),
                core_1.provide(router_1.LocationStrategy, {
                    useClass: router_1.HashLocationStrategy
                }),
                core_1.provide(router_1.APP_BASE_HREF, {
                    useValue: '/'
                })
            ];
            APP_PROVIDERS = [
                http_1.HTTP_PROVIDERS,
                common_1.FORM_PROVIDERS,
                ROUTER_PROVIDERS,
                todo_service_1.TodoService
            ];
            // bootstrap(TodosComponent, [TodoService, HTTP_PROVIDERS]);
            browser_1.bootstrap(app_1.App, [APP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map