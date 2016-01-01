/*global angular*/
angular.module("gessami")
    .provider("PhoneCallProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                makePhoneCall: function (phoneNumber, successHandler, errorHandler) {
                    if (window && window.plugins && window.plugins.CallNumber && window.plugins.CallNumber.callNumber) {
                        window.plugins.CallNumber.callNumber(
                            function (callState) {
                                successHandler(callState);
                            },
                            function (errorState) {
                                errorHandler("Error when making call: " + errorState);
                            },
                            phoneNumber
                        );
                    } else {
                        errorHandler("CallNumber capability is not available");
                    }
                }
            };
        };
    });
