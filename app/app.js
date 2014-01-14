define('app', [
    'angular',
    'bz', 'bz-model', 'ng-table'
], function (angular) {
    'use strict';

    return angular.module('app', [
        'bz', 'bzModel', 'ngTable'
    ]);
});