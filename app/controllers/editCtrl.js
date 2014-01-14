define([
    'app'
], function (app) {
    'use strict';

    app.controller('editCtrl', ['$scope', 'ContactModel', '$location', 'contact', '$rootScope',
        function($scope, ContactModel, $location, contact, $rootScope) {
        $scope.contact = angular.copy(contact);

        $scope.saveContact = function(item) {
            var form = $scope.form;
            if (!form.$valid) {
                angular.forEach(form.$error, function(value, key){
                    var type = form.$error[key];
                    angular.forEach(type , function(item ){
                        item.$dirty = true;
                        item.$prestine = false;
                    });
                });
                return;
            }
            if (item.id) {
                angular.copy(item, contact);
                ContactModel.save();
            } else {
                ContactModel.addContact(item);
            }
            $rootScope.$emit('contactsListUpdated');
            $location.path('/');
        }
    }]);

});