define([
    'app'
], function (app) {
    'use strict';

    app.controller('homeCtrl', ['$scope', 'ngTableParams', 'ContactModel', '$rootScope',
        function ($scope, ngTableParams, ContactModel, $rootScope) {

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            getData: function($defer, params) {

                var data = ContactModel.getContacts();

                params.total(data.length);
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

        $rootScope.$on('contactsListUpdated', function() {
            $scope.tableParams.reload();
            $scope.saved = true;
        });

    }]);

});