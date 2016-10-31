/*global angular*/

angular.module("starter")
    .controller("message", ["$rootScope", "$scope", "$location", function ($rootScope, $scope, $location) {
        "use strict";

        var parameters = $location.path().split('/');
        $scope.phone = parameters.pop();
        $scope.name = parameters.pop();

    }]);
