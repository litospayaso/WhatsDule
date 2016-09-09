/*global angular*/

var jq = $.noConflict();

angular.module("bagoaz")
    .controller("BagoazArietak", ["$rootScope", "$scope", function ($rootScope, $scope) {
        "use strict";
        jq("navbarCollapse").attr("navbar-collapse.in.display","off");
        console.log("querryy",jq("navbarCollapse"));
    }]);