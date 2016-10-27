/*global angular*/

angular.module("starter")
    .controller("BagoazBilatzaile", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        "use strict";
        $scope.bilatzaileIndex = [];

        $scope.search = function (){
            $scope.bilatzaileIndex = [];
            if($scope.searchWord==="")
                return;
            $rootScope.gaiak.forEach(function (element) {
                if (element.gaia.toLowerCase().indexOf($scope.searchWord.toLowerCase())>=0){
                    $scope.bilatzaileIndex.push(element);
                }
            });
        };
    }]);
