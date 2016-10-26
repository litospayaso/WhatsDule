/*global angular*/

angular.module("bagoaz")
    .controller("BagoazHiztegiak", ["$rootScope", "$scope", "$http", function ($rootScope, $scope, $http) {
        "use strict";

        var translator = new Translator();
        $scope.hiztegiak = function (){
            // console.log($scope.hizta);
            translator.translateLanguage($scope.hizta, {
                from: 'english',
                to: 'spanish',
                api_key: 'AIzaSyCUmCjvKRb-kOYrnoL2xaXb8I-_JJeKpf0', // use your own key
                callback: function (translatedText) {
                    console.log('translated text', translatedText);

                    // here you can use "speakTextUsingRobot"
                    // see below sections
                }
            });
        };
    }]);