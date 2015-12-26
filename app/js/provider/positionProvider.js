/*global angular*/
angular.module("gessami")
    .provider("PositionProvider", function () {
        "use strict";

        var currentPosition;

        this.$get = function () {
            return {
                getPositionData: function (successHandler, errorHandler) {
                    var locationX = 0,
                        locationY = 0,
                        onSuccess = function (position) {
                            locationX = position.coords.latitude;
                            locationY = position.coords.longitude;

                            successHandler({
                                locationX: locationX,
                                locationY: locationY
                            });
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
                },

                checkPositionData: function (successHandler, errorHandler) {
                    if (navigator && navigator.geolocation && navigator.geolocation.watchPosition) {
                        currentPosition = navigator.geolocation.watchPosition(function (position) {
                            successHandler({
                                locationX: position.coords.latitude,
                                locationY: position.coords.longitude
                            });
                        }, function (error) {
                            errorHandler("Geolocation error: " + error.code + " - " + error.message);
                        }, {
                            maximumAge: 3000,
                            timeout: 30000,
                            enableHighAccuracy: true
                        });
                    } else {
                        errorHandler("Geolocation capability is not available");
                    }
                },

                freePosition: function () {
                    if (currentPosition) {
                        navigator.geolocation.clearWatch(currentPosition);
                    }
                }
            };
        };
    });
