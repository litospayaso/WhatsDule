/*global angular*/

angular.module("bagoaz")
    .controller("BagoazBilatzaile", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        "use strict";
        $scope.bilatzaileIndex = [];

        $scope.search = function (){
            $scope.bilatzaileIndex = [];
            $rootScope.gaiak.forEach(function (element,index) {
                if (element.gaia.toLowerCase().indexOf($scope.searchWord.toLowerCase())>=0){
                    $scope.bilatzaileIndex.push(index+1);
                }
            });
        };
    }]);