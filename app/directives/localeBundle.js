define([
    'bz/app'
], function(app) {

    app.directive('localeBundle', ['$rootScope', '$http', function($rootScope, $http) {
        return {
            restrict: 'A',
            scope: {
                'bundle': '@localeBundle'
            },
            link: function(scope, element, attrs) {
                var loadTranslated = function(id) {
                    $http.get('/locale/theme-' + id + '.json').success(function(data){
                        $rootScope.$localeBundle = data;
                    });
                };
                $rootScope.$on('$languageChangeSuccess', function(e, id){
                    loadTranslated(id);
                });
            }
        };
    }]);

});