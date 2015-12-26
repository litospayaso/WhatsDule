/*global angular*/
angular.module("gessami")
    .provider("HRProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                getHRData: function (successHandler, errorHandler) {
                    var anterior = 0,
                        hr = Math.round(Math.random() * 10),
                        incremental = Math.sqrt(Math.pow(hr - anterior, 2)),
                        alertaHR = 7,
                        alertaInc = 4;

                    if (Math.random() < 0.95) {
                        successHandler({
                            hr: hr,
                            incremental: incremental,
                            alertaHR: alertaHR,
                            alertaInc: alertaInc
                        });
                    } else {
                        errorHandler("Error when getting HR");
                    }
                }
            };
        };
    });
