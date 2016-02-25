System.register(['../jasmine/patch'], function(exports_1) {
    var jasminePatch;
    return {
        setters:[
            function (jasminePatch_1) {
                jasminePatch = jasminePatch_1;
            }],
        execute: function() {
            jasminePatch.apply();
        }
    }
});
//# sourceMappingURL=jasmine-patch.js.map