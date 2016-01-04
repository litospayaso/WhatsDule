/*global angular, jq, $, console*/

var jq = $.noConflict(),
    alert = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    emergency = 2,
    refreshIndex = 3000,
    cancelEmergency = 0,
    emergencySent = 0;

angular.module("gessami")
    .controller("UserInformationController", ["$rootScope", "$scope", "$interval", "PositionProvider", "PulseProvider", "CO2Provider", "HRProvider", "SweatProvider", "TemperatureProvider", "PhoneCallProvider", "SmsProvider", "WhatsAppProvider", "ConversationProvider", function ($rootScope, $scope, $interval, PositionProvider, PulseProvider, CO2Provider, HRProvider, SweatProvider, TemperatureProvider, PhoneCallProvider, SmsProvider, WhatsAppProvider, ConversationProvider) {
        "use strict";

        $scope.initComponent = function () {
            $interval(function () {
                var total = 0;

                jq.each(alert, function () {
                    total += this;
                });
                total -= total[1]; //Check if user is running.

                if (total > emergency) {
                    console.log("emergency");
                    if (emergencySent > 0) {
                        emergencySent += 1;
                        if (emergencySent > 3) {
                            emergencySent = 0;
                        }
                    } else {
                        $scope.callEmergency();
                    }
                }

                $scope.checkCO2();
                $scope.checkHR();
                $scope.checkPulse();
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
                    alert[7] = 2;
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

        $scope.checkPositionData = function () {
            PositionProvider.checkPositionData(function (positionData) {
                $scope.locationX = positionData.locationX;
                $scope.locationY = positionData.locationY;
                $scope.speed = positionData.speed;
                console.log("speed: " + positionData.speed);
                if (positionData.speed > positionData.alertaSpeed) {
                    jq('#speedBox').css('border-color', 'blue');
                    alert[1] = 1;
                } else {
                    jq('#speedBox').css('border-color', '');
                    alert[1] = 0;
                }
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









        //ALGORITHM PART:
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
                }, 1000);
        };

        $scope.emergency = function () {
            if (cancelEmergency > 0) {
                cancelEmergency = 0;
            } else {
                jq("#calling").css("display", "block");
                var notification = localStorage.getItem("localNotification");

                if (notification === "call") {
                    $scope.makeCall();
                }
                if (notification === "sms") {
                    $scope.sendSMS();
                }
                if (notification === "whatsapp") {
                    $scope.sendWhatsApp();
                }

                $scope.recordConversation(30000);
            }
        };

        $scope.cancelEmergency = function () {
            cancelEmergency += 1;
        };

        $scope.emergencyFinished = function () {
            var counter = 5,
                interval2 = setInterval(
                    function () {
                        counter -= 1;
                        if (counter < 0) {
                            clearInterval(interval2);
                            jq("#calling").css("display", "none");
                        }
                    },
                    refreshIndex
                );
        };

        $scope.makeCall = function () {
            PhoneCallProvider.makePhoneCall(
                localStorage.getItem("localContactEmergency"),
                function () {
                    jq("#callingResponse").html("Making a call...");
                    $scope.emergencyFinished();
                },
                function (errorString) {
                    console.log("Error in PhoneCallProvider: " + errorString);

                    jq("#callingResponse").html("Unable to make the call. Please try again.");
                    $scope.emergencyFinished();
                }
            );
        };

        $scope.sendSMS = function () {
            SmsProvider.sendSMS(
                localStorage.getItem("localContactEmergency"),
                localStorage.getItem("localMensaje") + "\nhttp: //www.google.es/maps/place/" + $scope.locationX + "," + $scope.locationY,
                function () {
                    jq("#callingResponse").html("Sending SMS...");
                    $scope.emergencyFinished();
                },
                function (errorString) {
                    console.log("Error in SmsProvider: " + errorString);

                    jq("#callingResponse").html("Unable to send SMS. Please try again.");
                    $scope.emergencyFinished();
                }
            );
        };

        $scope.sendWhatsApp = function () {
            WhatsAppProvider.sendWhatsApp(
                localStorage.getItem("localContactEmergency"),
                localStorage.getItem("localMensaje"),
                "http: //www.google.es/maps/place/" + $scope.locationX + "," + $scope.locationY,
                function () {
                    jq("#callingResponse").html("Sending Whatsapp...");
                    $scope.emergencyFinished();
                },
                function (errorString) {
                    console.log("Error in WhatsAppProvider: " + errorString);

                    jq("#callingResponse").html("Unable to send WhatsApp. Please try again.");
                    $scope.emergencyFinished();
                }
            );
        };

        $scope.recordConversation = function (duration) {
            ConversationProvider.recordConversation(
                duration,
                function () {
                    console.log("recordAudio():Audio Success");
                },
                function (errorString) {
                    console.log("Error in ConversationProvider: " + errorString);
                }
            );
        };
    }]);