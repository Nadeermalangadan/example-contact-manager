define([
    'app'
], function (app) {
    'use strict';

    app.controller('homeCtrl', ['$scope', 'ngTableParams', 'ContactModel', '$rootScope', '$filter',
        function ($scope, ngTableParams, ContactModel, $rootScope, $filter) {

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            groupBy: function(item) {
                return item.group || 'No group';
            },
            getData: function($defer, params) {

                var data = ContactModel.getContacts();

                var filteredData = params.filter() ?
                    $filter('filter')(data, {'$': $scope.filter}) :
                    data;
                data = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    data;

                params.total(data.length);
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        $scope.$watch('filter', function(){
            $scope.tableParams.reload();
        });
        $rootScope.$on('contactsListUpdated', function() {
            $scope.tableParams.reload();
            $scope.saved = true;
        });

    }]);

});