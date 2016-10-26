/*global angular*/

angular.module("starter")
    .controller("BagoazAriketak", ["$rootScope", "$scope", function ($rootScope, $scope) {
        "use strict";
        $scope.ariketakIndex = [];
        $rootScope.ariketak.forEach(function (element,index) {
            $scope.ariketakIndex.push(index+1);
        });
    }]);
