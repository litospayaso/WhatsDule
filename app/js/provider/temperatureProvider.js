/*global angular*/
angular.module("gessami")
    .provider("TemperatureProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                getTemperatureData: function (successHandler, errorHandler) {
                    var temperature = Math.round(Math.random() * 10),
                        alerta = 7;

                    if (Math.random() < 0.95) {
                        successHandler({
                            temperature: temperature,
                            alerta: alerta
                        });
                    } else {
                        errorHandler("Error when getting temperature");
                    }
                }
            };
        };
    });
