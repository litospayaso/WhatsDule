/*global angular*/

angular.module("bagoaz")
    .controller("BagoazGaiak", ["$rootScope", "$scope", "$firebase", function ($rootScope, $scope, $firebase) {
        "use strict";
        // var bbdd = $firebase();
        // var ref = bbdd.ref("https://bagoaz-ee3eb.firebaseio.com");
        // console.log("BDDDD",bbdd);
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyANH9EFIjhLv69LSQ5XN3X40BwpEC4Lwb0",
            authDomain: "bagoaz-ee3eb.firebaseapp.com",
            databaseURL: "https://bagoaz-ee3eb.firebaseio.com",
            storageBucket: "bagoaz-ee3eb.appspot.com",
        };
        firebase.initializeApp(config);
        var rootRef = firebase.database().ref("bagoaz-ee3eb").limitToLast(100);
        console.log("EWWWWW",rootRef);
    }]);