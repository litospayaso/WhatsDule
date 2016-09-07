/*global angular*/
angular.module("bagoaz")
    .provider("CO2Provider", function () {
        "use strict";

        this.$get = function () {
            return {
                getCO2Data: function (successHandler, errorHandler) {
                    var breath = Math.round(Math.random() * 3) + 24,
                        co2 = Math.round(Math.random() * 4) + 35,
                        alertaBreath = 35,
                        alertaCo2 = 45;

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