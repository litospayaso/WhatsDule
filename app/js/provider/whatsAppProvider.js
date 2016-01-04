/*global angular*/
angular.module("gessami")
    .provider("WhatsAppProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                sendWhatsApp: function (phoneNumber, message, url, successHandler, errorHandler) {
                    if (window && window.plugins && window.plugins.socialsharing && window.plugins.socialsharing.shareViaWhatsAppToReceiver) {
                        window.plugins.socialsharing.shareViaWhatsAppToReceiver(
                            phoneNumber,
                            message,
                            null,
                            url,
                            function () {
                                successHandler();
                            }
                        );
                    } else {
                        errorHandler("WhatsApp capability is not available");
                    }
                }
            };
        };
    });