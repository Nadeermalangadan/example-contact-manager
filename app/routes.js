define([
    'angular', 'app'
], function (angular, app) {
    'use strict';

    app.config(['$routeProvider', '$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', 'bzUserProvider',
        function ($routeProvider, $routeSegmentProvider, $locationProvider, bzConfig, bzUser) {
            $locationProvider
                .html5Mode(false)
                .hashPrefix('!');

            $routeSegmentProvider.options.autoLoadTemplates = true;

            $routeSegmentProvider
                .when('/', 'home')
                .when('/add', 'home.add')
                .when('/contact/:id', 'home.edit')
                .segment('home', {
                    controller: 'homeCtrl',
                    templateUrl: '/views/index.html',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    resolveFailed: bzConfig.errorResolver()
                })
                .within()
                .segment('add', {
                    controller: 'editCtrl',
                    templateUrl: '/views/form-contact.html',
                    resolve: {
                        permissions: bzUser.access(),
                        contact: ['ContactModel', '$q', function(ContactModel, $q) {
                            var defer = $q.defer();
                            defer.resolve(new ContactModel());
                            return defer.promise;
                        }]
                    },
                    resolveFailed: bzConfig.errorResolver()
                })
                .segment('edit', {
                    controller: 'editCtrl',
                    templateUrl: '/views/form-contact.html',
                    resolve: {
                        permissions: bzUser.access(),
                        contact: ['ContactModel', '$routeParams', '$q', function(ContactModel, $routeParams, $q) {
                            var defer = $q.defer();
                            defer.resolve(ContactModel.getById($routeParams.id));
                            return defer.promise;
                        }]
                    },
                    dependencies: ['id'],
                    resolveFailed: bzConfig.errorResolver()
                });

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }]);

});