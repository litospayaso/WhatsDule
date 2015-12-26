/*global jq, angular*/

angular.module("gessami")
    .controller("UserConfigurationController", ["$rootScope", "$scope", function ($rootScope, $scope) {
        "use strict";

        var contactEmergency = localStorage.getItem("localContactEmergency"),
            notification = localStorage.getItem("localNotification"),
            sensitivity = localStorage.getItem("localSensitivity"),
            mensaje = localStorage.getItem("localMensaje");

        $scope.contactEmergency = contactEmergency;
        $scope.notification = notification;
        $scope.sensitivity = sensitivity;
        $scope.mensaje = mensaje;

        jq("#contactEmergencyBox").blur(function () {
            localStorage.setItem("localContactEmergency", jq("#contactEmergencyBox").val());
        });

        jq("#notificationBox").blur(function () {
            localStorage.setItem("localNotification", jq("#notificationBox").val());
        });

        jq("#sensitivityBox").blur(function () {
            localStorage.setItem("localSensitivity", jq("#sensitivityBox").val());
        });

        jq("#mensajeBox").blur(function () {
            localStorage.setItem("localMensaje", jq("#mensajeBox").val());
        });
    }]);
