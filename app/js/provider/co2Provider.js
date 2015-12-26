/*global angular*/
angular.module("gessami")
    .provider("CO2Provider", function () {
        "use strict";

        this.$get = function () {
            return {
                getCO2Data: function (successHandler, errorHandler) {
                    var breath = Math.round(Math.random() * 10),
                        co2 = Math.round(Math.random() * 10),
                        alertaBreath = 7,
                        alertaCo2 = 4;

                    if (Math.random() < 0.95) {
                        successHandler({
                            breath: breath,
                            co2: co2,
                            alertaBreath: alertaBreath,
                            alertaCo2: alertaCo2
                        });
                    } else {
                        errorHandler("Error when getting CO2");
                    }
                }
            };
        };
    });
