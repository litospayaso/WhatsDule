/*global angular*/
angular.module("gessami")
    .provider("SpeedProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                getSpeedData: function (successHandler, errorHandler) {
                    var velocidad = Math.round(Math.random() * 100),
                        alerta = 80;

                    if (Math.random() < 0.95) {
                        successHandler({
                            velocidad: velocidad,
                            alerta: alerta
                        });
                    } else {
                        errorHandler("Error when getting speed");
                    }
                }
            };
        };
    });
