/*global angular*/
angular.module("gessami")
    .provider("PositionProvider", function () {
        "use strict";
        this.$get = function () {
            return {
                getPositionData: function (successHandler, errorHandler) {
                    var locationX = 0,
                        locationY = 0,
                        onSuccess = function (position) {
                            locationX = position.coords.latitude;
                            locationY = position.coords.longitude;
                        },

                        onError = function (error) {
                            errorHandler("Error when getting location");
                        };

                    navigator.geolocation.getCurrentPosition(onSuccess, onError);

                    if (locationX > 0) {
                        successHandler({
                            locationX: locationX,
                            locationY: locationY
                        });
                    } else {
                        errorHandler("Error when getting location");
                    }
                }
            };
        };
    });