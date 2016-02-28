System.register([], function(exports_1) {
    var Todo;
    return {
        setters:[],
        execute: function() {
            Todo = (function () {
                function Todo(obj) {
                    this.id = obj && obj.id || null;
                    this.status = obj && obj.status || 0;
                    this.title = obj && obj.title || '';
                    this.createdAt = obj && obj.created_at || null;
                    this.updatedAt = obj && obj.updated_at || null;
                }
                return Todo;
            })();
            exports_1("Todo", Todo);
        }
    }
});
//# sourceMappingURL=todo.js.map