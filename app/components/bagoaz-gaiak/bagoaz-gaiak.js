/*global angular*/

angular.module("bagoaz")
    .controller("BagoazGaiak", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        "use strict";

        $http.get('database/bagoaz.json').success(function (data) {
            //Convert data to array.
            //datos lo tenemos disponible en la vista gracias a $scope
            console.log("datooos",data);
        });
    }]);