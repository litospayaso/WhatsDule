/*global angular, jq, $, console*/

var jq = $.noConflict(),
    alert = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    emergency = 2,
    refreshIndex = 1000,
    cancelEmergency = 0;

angular.module("gessami")
    .controller("UserInformationController", ["$rootScope", "$scope", "$interval", "PositionProvider", "PulseProvider", "CO2Provider", "HRProvider", "SweatProvider", "SpeedProvider", "TemperatureProvider", function ($rootScope, $scope, $interval, PositionProvider, PulseProvider, CO2Provider, HRProvider, SweatProvider, SpeedProvider, TemperatureProvider) {
        "use strict";

        $scope.initComponent = function () {
            $interval(function () {
                var total = 0;

                jq.each(alert, function () {
                    total += this;
                });

                if (total > emergency) {
                    console.log("emergency");
                    // TODO callEmergency();
                }

                $scope.checkCO2();
                $scope.checkHR();
                //$scope.checkPosition();
                $scope.checkPulse();
                $scope.checkSpeed();
                $scope.checkSweat();
                $scope.checkTemperature();
            }, refreshIndex);

            $scope.checkPositionData();
        };

        $scope.checkCO2 = function () {
            CO2Provider.getCO2Data(function (co2Data) {
                $scope.breath = co2Data.breath;
                $scope.co2 = co2Data.co2;

                if (co2Data.breath > co2Data.alertaBreath) {
                    jq('#breathBox').css('border-color', 'red');
                    alert[6] = 1;
                } else {
                    jq('#breathBox').css('border-color', '');
                    alert[6] = 0;
                }

                if (co2Data.co2 > co2Data.alertaCo2) {
                    jq('#co2Box').css('border-color', 'red');
                    alert[7] = 1;
                } else {
                    jq('#co2Box').css('border-color', '');
                    alert[7] = 0;
                }
            }, function (errorString) {
                console.log("Error in CO2Provider: " + errorString);
            });
        };

        $scope.checkHR = function () {
            var anterior;

            HRProvider.getHRData(function (hrData) {
                $scope.hr = hrData.hr;
                $scope.incremental = hrData.incremental;
                anterior = hrData.hr;

                if (hrData.hr > hrData.alertaHR) {
                    jq('#hrBox').css('border-color', 'red');
                    alert[3] = 1;
                } else {
                    jq('#hrBox').css('border-color', '');
                    alert[3] = 0;
                }

                if (hrData.incremental > hrData.alertaInc) {
                    jq('#incrementalBox').css('border-color', 'red');
                    alert[4] = 1;
                } else {
                    jq('#incrementalBox').css('border-color', '');
                    alert[4] = 0;
                }
            }, function (errorString) {
                console.log("Error in HRProvider: " + errorString);
            });
        };

        $scope.checkPosition = function () {
            PositionProvider.getPositionData(function (positionData) {
                $scope.locationX = positionData.locationX;
                $scope.locationY = positionData.locationY;
            }, function (errorString) {
                console.log("Error in PositionProvider: " + errorString);
            });
        };

        $scope.checkPositionData = function () {
            PositionProvider.checkPositionData(function (positionData) {
                $scope.locationX = positionData.locationX;
                $scope.locationY = positionData.locationY;
            }, function (errorString) {
                console.log("Error in PositionProvider: " + errorString);
            });
        };

        $scope.checkPulse = function () {
            PulseProvider.getPulseData(function (pulseData) {
                $scope.pulse = pulseData.pulso;

                if (pulseData.pulso > pulseData.alerta) {
                    jq('#pulseBox').css('border-color', 'red');
                    alert[0] = 1;
                } else {
                    jq('#pulseBox').css('border-color', '');
                    alert[0] = 0;
                }
            }, function (errorString) {
                console.log("Error in PulseProvider: " + errorString);
            });
        };

        $scope.checkSpeed = function () {
            SpeedProvider.getSpeedData(function (speedData) {
                $scope.speed = speedData.velocidad;

                if (speedData.velocidad > speedData.alerta) {
                    jq('#speedBox').css('border-color', 'red');
                    alert[1] = 1;
                } else {
                    jq('#speedBox').css('border-color', '');
                    alert[1] = 0;
                }
            }, function (errorString) {
                console.log("Error in SpeedProvider: " + errorString);
            });
        };

        $scope.checkSweat = function () {
            SweatProvider.getSweatData(function (sweatData) {
                $scope.sweat = sweatData.sudor;

                if (sweatData.sudor > sweatData.alerta) {
                    jq('#sweatBox').css('border-color', 'red');
                    alert[2] = 1;
                } else {
                    jq('#sweatBox').css('border-color', '');
                    alert[2] = 0;
                }
            }, function (errorString) {
                console.log("Error in SweatProvider: " + errorString);
            });
        };

        $scope.checkTemperature = function () {
            TemperatureProvider.getTemperatureData(function (temperatureData) {
                $scope.temperature = temperatureData.temperature;

                if (temperatureData.temperature > temperatureData.alerta) {
                    jq('#temperatureBox').css('border-color', 'red');
                    alert[5] = 1;
                } else {
                    jq('#temperatureBox').css('border-color', '');
                    alert[5] = 0;
                }
            }, function (errorString) {
                console.log("Error in TemperatureProvider: " + errorString);
            });
        };

        $scope.emergency = function () {
            if (cancelEmergency > 0) {
                cancelEmergency = 0;
            } else {
                jq("#calling").css("display", "block");

                if (navigator && navigator.vibrate) {
                    navigator.vibrate(3000);
                }

                var counter = 5,
                    interval2 = setInterval(function () {
                        counter -= 1;
                        if (counter < 0) {
                            clearInterval(interval2);
                            jq("#calling").css("display", "none");
                        }
                    }, refreshIndex);
            }
        };

        $scope.callEmergency = function () {
            jq("#emergencyAlert").css("display", "block");
            var counter = 5,
                interval = setInterval(function () {
                    jq("#currentSeconds").html(counter);
                    counter -= 1;

                    if (navigator && navigator.vibrate) {
                        navigator.vibrate(500);
                    }

                    if (counter < 0) {
                        jq("#emergencyAlert").css("display", "none");
                        $scope.emergency();
                        clearInterval(interval);
                    }
                }, refreshIndex);
        };

        $scope.cancelEmergency = function () {
            cancelEmergency += 1;
        };
    }]);
