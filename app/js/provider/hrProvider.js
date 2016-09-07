/*global angular*/
angular.module("bagoaz")
    .provider("HRProvider", function () {
        "use strict";
        var anterior = 0;
        this.$get = function () {
            return {
                getHRData: function (successHandler, errorHandler) {

                    var hr = Math.round(Math.random() * 4) + 79,
                        incremental = Math.sqrt(Math.pow(hr - anterior, 2)),
                        alertaHR = 110,
                        alertaInc = 17;

                    if (Math.random() < 0.95) {
                        successHandler({
                            hr: hr,
                            incremental: incremental,
                            alertaHR: alertaHR,
                            alertaInc: alertaInc
                        });
                        anterior = hr;
                    } else {
                        errorHandler("Error when getting HR");
                    }
                }
            };
        };
    });