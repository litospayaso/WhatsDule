/*global angular*/

angular.module("bagoaz")
    .controller("BagoazLexiko", ["$rootScope", "$scope", function ($rootScope, $scope) {
        "use strict";
        $scope.lexikoIndex = [];
        $rootScope.lexiko.forEach(function (element,index) {
            $scope.lexikoIndex.push(index+1);
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