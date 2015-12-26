/*global angular*/

angular.module("gessami", ["ngNewRouter"])
    .controller("MainController", ["$rootScope", "$scope", "$router", "$location", function ($rootScope, $scope, $router, $location) {
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
            }
        ]);

        $scope.initApp = function () {
            $location.path("/userInformation");
        };

        $scope.moveScreen = function (targetScreen) {
            $location.path(targetScreen);
        };
    }]);
