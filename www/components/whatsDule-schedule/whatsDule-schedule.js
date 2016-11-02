/*global angular*/

angular.module("starter")
  .controller("schedule", ["$rootScope", "$scope", function ($rootScope, $scope) {
    "use strict";
    $scope.messagesList = [];
    var messages = [];

    if (JSON.parse(localStorage.getItem("messages")) != null){
      messages = JSON.parse(localStorage.getItem("messages"));
      messages.forEach(function (element,index) { //adding id to the messages.
        element.id = index;
        $scope.messagesList.push(element);
      });
      messages = $scope.messagesList;
    }

    $scope.find = function () {
      $scope.messagesList=[];
      messages.forEach(function (element) {
        if (element.name.toLowerCase().indexOf($scope.search.toLowerCase())>=0 ||
          element.message.toLowerCase().indexOf($scope.search.toLowerCase())>=0 ||
          element.phone.toLowerCase().indexOf($scope.search.toLowerCase())>=0){
          $scope.messagesList.push(element);
        }
      });
    };
  }]);
