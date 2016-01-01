/*global angular, jq, $, console*/

var jq = $.noConflict(),
    alert = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    emergency = 2,
    refreshIndex = 3000,
    cancelEmergency = 0,
    emergencySent = 0;

angular.module("gessami")
    .controller("UserInformationController", ["$rootScope", "$scope", "$interval", "PositionProvider", "PulseProvider", "CO2Provider", "HRProvider", "SweatProvider", "TemperatureProvider", function ($rootScope, $scope, $interval, PositionProvider, PulseProvider, CO2Provider, HRProvider, SweatProvider, TemperatureProvider) {
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
                    $scope.makeACall();
                }
                if (notification === "sms") {
                    $scope.sendAnSMS();
                }
                if (notification === "whatsapp") {
                    $scope.sendAWhatsapp();
                }
                $scope.recordConversation(30);

            }
        };

        $scope.cancelEmergency = function () {
            cancelEmergency += 1;
        };

        $scope.makeACall = function () {
            var numeroTelf = localStorage.getItem("localContactEmergency");

            window.plugins.CallNumber.callNumber(
                function onSuccess() {
                    jq("#callingResponse").html("Making a call...");
                    var counter = 5,
                        interval2 = setInterval(function () {
                            counter -= 1;
                            if (counter < 0) {
                                clearInterval(interval2);
                                jq("#calling").css("display", "none");
                            }
                        }, refreshIndex);
                },
                function onError() {
                    jq("#callingResponse").html("Unable to make the call. Please try again.");
                    var counter = 5,
                        interval2 = setInterval(function () {
                            counter -= 1;
                            if (counter < 0) {
                                clearInterval(interval2);
                                jq("#calling").css("display", "none");
                            }
                        }, refreshIndex);
                },
                numeroTelf
            );
        };

        $scope.sendAnSMS = function () {
            var numeroTelf = localStorage.getItem("localContactEmergency"),
                mensaje = localStorage.getItem("localMensaje"),
                options = {
                    replaceLineBreaks: true, // true to replace \n by a new line, false by default
                    android: {
                        //intent: 'INTENT'
                        intent: ''
                    }
                };
            mensaje = mensaje + "\n" + "http: //www.google.es/maps/place/" + $scope.locationX + "," + $scope.locationY;

            sms.send(
                numeroTelf,
                mensaje,
                options,
                function success() {
                    jq("#callingResponse").html("Sending SMS...");
                    var counter = 5,
                        interval2 = setInterval(function () {
                            counter -= 1;
                            if (counter < 0) {
                                clearInterval(interval2);
                                jq("#calling").css("display", "none");
                            }
                        }, refreshIndex);
                },
                function error() {
                    jq("#callingResponse").html("Unable to send the SMS. Please try again.");
                    var counter = 5,
                        interval2 = setInterval(function () {
                            counter -= 1;
                            if (counter < 0) {
                                clearInterval(interval2);
                                jq("#calling").css("display", "none");
                            }
                        }, refreshIndex);
                }
            );
        };

        $scope.sendAWhatsapp = function () {
            var numeroTelf = localStorage.getItem("localContactEmergency"),
                mensaje = localStorage.getItem("localMensaje"),
                url = "http://www.google.es/maps/place/" + $scope.locationX + "," + $scope.locationY;

            mensaje = mensaje + "  " + url;

            window.plugins.socialsharing.shareViaWhatsAppToReceiver(
                numeroTelf,
                mensaje,
                null, //img
                null, //url
                function success() {
                    jq("#callingResponse").html("Sending Whatsapp...");
                    var counter = 5,
                        interval2 = setInterval(function () {
                            counter -= 1;
                            if (counter < 0) {
                                clearInterval(interval2);
                                jq("#calling").css("display", "none");
                            }
                        }, refreshIndex);
                }
            );
        };

        $scope.recordConversation = function (duration) {
            var src = "myrecording.mp3",
                duracion = duration * 1000,
                mediaRec = new Media(src,
                    // success callback
                    function () {
                        console.log("recordAudio():Audio Success");
                    },

                    // error callback
                    function (err) {
                        console.log("recordAudio():Audio Error: " + err.code);
                    });

            // Record audio
            mediaRec.startRecord();

            // Stop recording after 30 seconds
            setTimeout(function () {
                mediaRec.stopRecord();
            }, duracion);
        };

    }]);