System.register(['../utils'], function(exports_1) {
    var utils;
    function apply() {
        if (global.navigator && global.navigator.geolocation) {
            utils.patchPrototype(global.navigator.geolocation, [
                'getCurrentPosition',
                'watchPosition'
            ]);
        }
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
//# sourceMappingURL=geolocation.js.map