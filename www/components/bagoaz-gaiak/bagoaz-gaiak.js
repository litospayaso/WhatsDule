/*global angular*/

angular.module("starter")
    .controller("BagoazGaiak", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        "use strict";
        $scope.gaiakIndex = $rootScope.gaiak;
        // $rootScope.gaiak.forEach(function (element,index) {
        //     $scope.gaiakIndex.push(index+1);
        // });
    }]);
