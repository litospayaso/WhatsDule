/*global angular*/
angular.module("gessami")
    .provider("SweatProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                getSweatData: function (successHandler, errorHandler) {
                    var sudor = Math.round(Math.random() * 100),
                        alerta = 70;

                    if (Math.random() < 0.95) {
                        successHandler({
                            sudor: sudor,
                            alerta: alerta
                        });
                    } else {
                        errorHandler("Error when getting sweat info");
                    }
                }
            };
        };
    });
