System.register(['../utils'], function(exports_1) {
    var utils;
    function apply() {
        utils.patchClass('FileReader');
    }
    exports_1("apply", apply);
    return {
        setters:[
            function (utils_1) {
                utils = utils_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=file-reader.js.map