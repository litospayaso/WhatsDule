/*global angular*/

angular.module("bagoaz")
    .controller("BagoazIkusi", ["$rootScope", "$scope", "$location", "$sce", function ($rootScope, $scope, $location, $sce) {
        "use strict";
        console.log("valor con el parametro", $location.path().split('/').pop()) //VAMOS A ELEGIR ESTE!
        console.log("array con las lecciones", $rootScope.gaiak);
        $scope.orainGaia = $sce.trustAsHtml( $rootScope.gaiak[$location.path().split('/').pop()].gaia);
        // console.log("orain",orainGaia);
    }]);