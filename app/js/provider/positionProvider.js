/*global angular*/
angular.module("bagoaz")
    .provider("PositionProvider", function () {
        "use strict";

        var currentPosition;

        this.$get = function () {
            return {
                checkPositionData: function (successHandler, errorHandler) {
                    if (navigator && navigator.geolocation && navigator.geolocation.watchPosition) {
                        currentPosition = navigator.geolocation.watchPosition(function (position) {
                            successHandler({
                                locationX: position.coords.latitude,
                                locationY: position.coords.longitude,
                                speed: position.coords.speed || 0,
                                alertaSpeed: 80
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