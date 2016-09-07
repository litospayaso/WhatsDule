/*global angular*/

angular.module("bagoaz", ["ngNewRouter","firebase"])
    .controller("MainController", ["$rootScope", "$scope", "$router", "$location", "$firebase", function ($rootScope, $scope, $router, $location, $firebase) {
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
            }
        ]);

        $scope.initApp = function () {
            $location.path("/bagoazGaiak");
        };

        $scope.moveScreen = function (targetScreen) {
            $location.path(targetScreen);
        };
    }]);