/*global angular*/
angular.module("gessami")
    .provider("PulseProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                getPulseData: function (successHandler, errorHandler) {
                    var pulso = Math.round(Math.random() * 10),
                        alerta = 6;

                    if (Math.random() < 0.95) {
                        successHandler({
                            pulso: pulso,
                            alerta: alerta
                        });
                    } else {
                        errorHandler("Error when getting pulse");
                    }
                }
            };
        };
    });
