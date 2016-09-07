/*global angular*/
angular.module("bagoaz")
    .provider("PulseProvider", function () {
        "use strict";

        var currentPulse;

        this.$get = function () {
            return {
                getPulseData: function (successHandler, errorHandler) {
                    var aceleracionAnterior;
                    if (navigator && navigator.accelerometer && navigator.accelerometer.watchAcceleration) {
                        currentPulse = navigator.accelerometer.watchAcceleration(function (acceleration) {
                            var aceleracionActual;
                            if (aceleracionAnterior !== undefined) {
                                aceleracionActual = {};
                                aceleracionActual.x = Math.abs(aceleracionAnterior.x - acceleration.x);
                                aceleracionActual.y = Math.abs(aceleracionAnterior.y - acceleration.y);
                                aceleracionActual.z = Math.abs(aceleracionAnterior.z - acceleration.z);
                                aceleracionActual.total = aceleracionActual.x + aceleracionActual.y + aceleracionActual.z;
                                aceleracionAnterior = acceleration;
                                successHandler({
                                    pulso: aceleracionActual.total,
                                    alerta: 20
                                });
                            }
                            aceleracionAnterior = acceleration;
                        }, function (error) {
                            errorHandler("Pulse error: " + error.code + " - " + error.message);
                        }, {
                            maximumAge: 3000,
                            timeout: 30000,
                            enableHighAccuracy: true
                        });
                    } else {
                        errorHandler("Accelerometer capability is not available");
                    }
                },

                freePulse: function () {
                    if (currentPulse) {
                        navigator.accelerometer.clearWatch(currentPulse);
                    }
                }
            };
        };
    });