/*global angular*/
angular.module("bagoaz")
    .provider("TemperatureProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                getTemperatureData: function (successHandler, errorHandler) {
                    //var temperature = Math.round(Math.random() * 10),                    
                    var temperature = 37,
                        alerta = 39;

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