define([
    'bz/app'
], function(app) {

    app.directive('localeBundle', function() {
        return {
            restrict: 'A',
            scope: {
                'bundle': '@localeBundle'
            },
            link: function(scope, element, attrs) {

            }
        };
    });

});