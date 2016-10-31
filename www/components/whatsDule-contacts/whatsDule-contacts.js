/*global angular*/

angular.module("starter")
    .controller("contacts", ["$rootScope", "$scope", "$http", function ($rootScope, $scope,  $http) {
        "use strict";
        $scope.contactList = [];
        $http.get('database/example.json').success(function (data) {
            data.forEach(function (elem) {
                elem.phoneNumbers.forEach(function (element) {
                    if(element.type === "MOBILE"){
                        $scope.contactList.push({"name":elem.displayName,"phone":element.normalizedNumber})
                    }
                });
            });
        });
    }]);
