/*global angular*/

angular.module("starter")
  .controller("message", ["$rootScope", "$scope", "$location", "$window", function ($rootScope, $scope, $location, $window) {
    "use strict";

    var cookie = [];
    if (JSON.parse(localStorage.getItem("messages")) != null){
      cookie = JSON.parse(localStorage.getItem("messages"));
    }

    var parameters = $location.path().split('/');

    if(parameters.length===5){
      $scope.phone = parameters.pop();
      $scope.name = parameters.pop();
      $scope.disButton = true;
      $scope.day="dd";
      $scope.month="MM";
      $scope.hour="HH";
      $scope.minutes="mm";
      $scope.text ="";
    }else{
      $scope.id = parameters.pop();
      $scope.phone = cookie[$scope.id].phone;
      $scope.name = cookie[$scope.id].name;
      $scope.edit = true;
      $scope.day=cookie[$scope.id].time.split("/")[0];
      $scope.month=cookie[$scope.id].time.split("/")[1].substr(0,2);
      $scope.hour=cookie[$scope.id].time.split("(")[1].substr(0,2);
      $scope.minutes=cookie[$scope.id].time.split(":")[1].substr(0,2);
      $scope.text =cookie[$scope.id].message;
    }

    $scope.date = function (){
      if($scope.day!=="dd" && $scope.month!=="MM" && $scope.hour!=="HH" && $scope.minutes!=="mm" && $scope.text!==""){
        $scope.disButton = false;
      }
    };

    $scope.createMessage = function () {
      var date = new Date(2016,$scope.month-1,$scope.day,$scope.hour,$scope.minutes);
      var message = {
        "name"  : $scope.name,
        "phone" : $scope.phone,
        "message" : $scope.text,
        "preview" : $scope.text.length < 20 ? $scope.text : $scope.text.substr(0,20) + "...",
        "date" : date,
        "time" : $scope.day + "/" + $scope.month + " (" + $scope.hour + ":" + $scope.minutes + ")"
      };
      cookie.push(message);
      localStorage.setItem("messages", JSON.stringify(cookie));
      window.plugins.socialsharing.shareViaWhatsAppToReceiver(
        message.phone,
        message.message,
        null /* img */,
        null /* url */,
        function() {
          console.log('share ok')});
      $scope.moveScreen('#/app/Schedule/');
      $window.location.reload();
    };

    $scope.editMessage = function () {
      var date = new Date(2016,$scope.month-1,$scope.day,$scope.hour,$scope.minutes);
      var message = {
        "name"  : $scope.name,
        "phone" : $scope.phone,
        "message" : $scope.text,
        "preview" : $scope.text.length < 20 ? $scope.text : $scope.text.substr(0,20) + "...",
        "date" : date,
        "time" : $scope.day + "/" + $scope.month + " (" + $scope.hour + ":" + $scope.minutes + ")"
      };
      cookie[$scope.id] = message;
      localStorage.setItem("messages", JSON.stringify(cookie));
      $scope.moveScreen('#/app/Schedule/');
      $window.location.reload();
    };

    $scope.deleteMessage = function () {
      cookie.splice($scope.id,1);
      localStorage.setItem("messages", JSON.stringify(cookie));
      $scope.moveScreen('#/app/Schedule/');
      $window.location.reload();
    };
  }]);
