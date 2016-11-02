/*global angular*/

angular.module("starter")
  .controller("contacts", ["$rootScope", "$scope", "$http", function ($rootScope, $scope,  $http) {
    "use strict";
    var contacts = [];
    $scope.contactList = [];

    $scope.find = function () {
      $scope.contactList=[];
      contacts.forEach(function (element) {
        if (element.name.toLowerCase().indexOf($scope.search.toLowerCase())>=0 ||
          element.phone.toLowerCase().indexOf($scope.search.toLowerCase())>=0){
          $scope.contactList.push(element);
        }
      });
    };

    // $http.get('database/example.json').success(function (data) {
    //   data.forEach(function (elem) {
    //     elem.phoneNumbers.forEach(function (element) {
    //       if(element.type === "MOBILE"){
    //         $scope.contactList.push({"name":elem.displayName,"phone":element.normalizedNumber});
    //         contacts.push({"name":elem.displayName,"phone":element.normalizedNumber});
    //       }
    //     });
    //   });
    // });

    navigator.contactsPhoneNumbers.list(function(contacts) {
        contacts.forEach(function (elem) {
          elem.phoneNumbers.forEach(function (element) {
            if(element.type === "MOBILE"){
              $scope.contactList.push({"name":elem.displayName,"phone":element.normalizedNumber});
              contacts.push({"name":elem.displayName,"phone":element.normalizedNumber});
            }
          });
        });
    }, function(error) {
      console.error(error);
    });

  }]);
