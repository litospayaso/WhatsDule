/*global angular*/

angular.module("bagoaz")
    .controller("BagoazIkusi", ["$rootScope", "$scope", "$location", "$sce", function ($rootScope, $scope, $location, $sce) {
        "use strict";
        // console.log("valor con el parametro", $location.path().split('/').pop()) //VAMOS A ELEGIR ESTE!
        // console.log("array con las lecciones", $rootScope.gaiak);

        jq('html, body').animate({
            scrollTop: 0
        }, 0);

        var parameters = $location.path().split('/');
        var gaiaZenbaki = parameters.pop() - 1;
        var ikusten = parameters.pop();
        if (ikusten === 'gaia') {
            $scope.orainGaia = $sce.trustAsHtml($rootScope.gaiak[gaiaZenbaki].gaia);
            // console.log("orain",orainGaia);
        } else {
            $scope.lexikoak = $rootScope.lexiko[gaiaZenbaki];
        }

        $scope.bueltanEginteko = function () {
            if (ikusten === 'gaia') {
                $location.path('bagoazGaiak');
            } else
                $location.path('bagoazLexiko');
        }
    }]);