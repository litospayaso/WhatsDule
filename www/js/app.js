// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.Contacts', {
    url: '/Contacts',
    views: {
      'menuContent': {
        templateUrl: 'components/whatsDule-contacts/whatsDule-contacts.html'
      }
    }
  })
    .state('app.Message', {
    url: '/Message/:contact/:phone',
    views: {
      'menuContent': {
        templateUrl: 'components/whatsDule-message/whatsDule-message.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/Contacts');
});

angular.module("starter")
  .controller("indexController", ["$rootScope", "$scope", "$location", "$http", function ($rootScope, $scope, $location, $http) {
    "use strict";

    $scope.moveScreen = function (targetScreen) {
      $location.path(targetScreen);
    };

  }]);

