/*global angular*/

angular.module("bagoaz", ["ngNewRouter","firebase"])
    .controller("MainController", ["$rootScope", "$scope", "$router", "$location", "$http", function ($rootScope, $scope, $router, $location, $http) {
        "use strict";

        // $routeProvider.when('/bagoazIkusi/:variable1', {
        //     templateUrl: "bagoazIkusi.html",
        //     controller: "BagoazIkusi"
        // });

        $router.config([
            {
                path: "/gessamiAbout",
                components: {
                    "main": "gessamiAbout"
                }
            }, {
                path: "/gessamiHelp",
                components: {
                    "main": "gessamiHelp"
                }
            }, {
                path: "/userConfiguration",
                components: {
                    "main": "userConfiguration"
                }
            }, {
                path: "/userInformation",
                components: {
                    "main": "userInformation"
                }
            },{
                path: "/bagoazGaiak",
                components: {
                    "main": "bagoazGaiak"
                }
            },{
                path: "/bagoazLexiko",
                components: {
                    "main": "bagoazLexiko"
                }
            },{
                path: "/bagoazAriketak",
                components: {
                    "main": "bagoazAriketak"
                }
            },{
                path: "/bagoazIkusi/:variable1",
                components: {
                    "main": "bagoazIkusi"
                }
            },{
                path: "/bagoazBaloratzea/:variable1/:variable2",
                components: {
                    "main": "bagoazBaloratzea"
                }
            }
        ]);

        $scope.initApp = function () {
            $location.path("/bagoazGaiak");
        };

        $scope.moveScreen = function (targetScreen) {
            $location.path(targetScreen);
        };

        $http.get('database/bagoaz-export.json').success(function (data) {
            //Convert data to array.
            //datos lo tenemos disponible en la vista gracias a $scope
            //console.log("datooos",data);
            $rootScope.gaiak = data.gaiak;
        });

    }]);