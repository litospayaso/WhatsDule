/*global angular*/

angular.module("bagoaz")
    .controller("BagoazBaloratzea", ["$rootScope", "$scope", "$location", "$sce", function ($rootScope, $scope, $location, $sce) {
        "use strict";
            var parameters = $location.path().split('/');
            var level = parameters.pop()-1;
            var ariketak = $rootScope.ariketak[level];
            ariketak = ariketak.sort(function() {return Math.random() - 0.5}); //unsorting the array.
            var orain = ariketak.pop();

            $scope.orainAriketa = orain.euskara;

            $scope.zuzendu = function(){
                    $scope.ondoEbazpen = orain.gaztelania
                    if($scope.erantzun === orain.gaztelania){
                            $scope.ebazpen = "Oso ondo ";
                    }else{
                            $scope.ebazpen = "Fallo ";
                    }
            }
    }]);