define(['app'], function (app) {
    'use strict';

    app.factory('ContactModel', ['bzModel', '$q',
        function (bzModel, $q) {

            var _list,
                model = new bzModel({
                    $name: 'contact',
                    $defaults: {
                        name: 'Untitled',
                        surname: '',
                        group: '',
                        phone: ''
                    },
                    $initialize: function () {
                    },
                    getUrl: function () {
                        return '#!/contact/' + this.id;
                    }
                });

            // load from localStorage
            try {
                _list = angular.fromJson(localStorage.contacts) || [];
                _list.map(function(item, k) { _list[k] = new model(item); });
            } catch (e) {
                _list = [];
            }

            /**
             * Get list of contacts
             * @returns {*}
             */
            model.getContacts = function() {
                return _list;
            };

            /**
             * Get contact by id
             * @param id
             * @returns {*}
             */
            model.getById = function(id) {
                var list = this.getContacts();
                for (var i = 0, count = list.length; i < count; i++) {
                    if (list[i].id == id) {
                        return list[i];
                    }
                }
                return null;
            };

            /**
             * Add new contact to list
             * @param contact
             */
            model.addContact = function(contact) {
                var list = this.getContacts();
                contact.id = list.length + 1;
                list.push(contact);
                this.save();
            };

            /**
             * Save to localStorage
             */
            model.save = function() {
                localStorage.contacts = angular.toJson(_list);
            };
            return model;
        }]);

});