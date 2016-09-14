/*global angular*/

angular.module("bagoaz")
    .controller("BagoazGaiak", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        "use strict";
        $scope.gaiakIndex = [];
        $rootScope.gaiak.forEach(function (element,index) {
            $scope.gaiakIndex.push(index+1);
        });

        var cookie = [];
        if (JSON.parse(localStorage.getItem("cookie")) != null){
           cookie = JSON.parse(localStorage.getItem("cookie"));
        }

        $scope.colorButton = function (index){
            if (cookie.indexOf(index) > -1){
                return "btn btn-secundary btn-lg btn-block"
                // return "btn btn-primary btn-lg btn-block"
            }else{
                return "btn btn-primary btn-lg btn-block"
                // return "btn btn-info btn-lg btn-block"
            }
        };
    }]);