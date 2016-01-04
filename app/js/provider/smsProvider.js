/*global angular, sms*/
angular.module("gessami")
    .provider("SmsProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                sendSMS: function (phoneNumber, message, successHandler, errorHandler) {
                    if (sms) {
                        sms.send(phoneNumber,
                            message, {
                                replaceLineBreaks: true, // true to replace \n by a new line, false by default
                                android: {
                                    intent: ''
                                }
                            },
                            function () {
                                successHandler();
                            },
                            function (errorState) {
                                errorState("Error when sending sms: " + errorState);
                            });
                    } else {
                        errorHandler("SMS capability is not available");
                    }
                }
            };
        };
    });