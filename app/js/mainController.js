/*global angular*/

angular.module("bagoaz", ["ngNewRouter","firebase"])
    .controller("MainController", ["$rootScope", "$scope", "$router", "$location", "$http", function ($rootScope, $scope, $router, $location) {
        "use strict";
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
            }
        ]);

        $scope.initApp = function () {
            $location.path("/bagoazGaiak");
        };

        $scope.moveScreen = function (targetScreen) {
            $location.path(targetScreen);
        };
    }]);