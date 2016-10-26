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

  .state('app.Laguntza', {
    url: '/Laguntza',
    views: {
      'menuContent': {
        templateUrl: 'components/bagoaz-about/bagoaz-about.html'
      }
    }
  })

  .state('app.Gaiak', {
      url: '/Gaiak',
      views: {
        'menuContent': {
          templateUrl: 'components/bagoaz-gaiak/bagoaz-gaiak.html'
        }
      }
    })
  .state('app.Ariketak', {
      url: '/Ariketak',
      views: {
        'menuContent': {
          templateUrl: 'components/bagoaz-ariketak/bagoaz-ariketak.html'
        }
      }
    })
    .state('app.Bilatzaile', {
      url: '/Bilatzaile',
      views: {
        'menuContent': {
          templateUrl: 'components/bagoaz-Bilatzaile/bagoaz-Bilatzaile.html'
        }
      }
    })

  .state('app.Gaia', {
    url: '/Ikusi/:tipo/:numero',
    views: {
      'menuContent': {
        templateUrl: 'components/bagoaz-ikusi/bagoaz-ikusi.html'
      }
    }
  })

    .state('app.Ariketa', {
    url: '/Baloratzea/:gaiak',
    views: {
      'menuContent': {
        templateUrl: 'components/bagoaz-baloratzea/bagoaz-baloratzea.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/Gaiak');
});

angular.module("starter")
  .controller("indexController", ["$rootScope", "$scope", "$location", "$http", function ($rootScope, $scope, $location, $http) {
    "use strict";

    $scope.moveScreen = function (targetScreen) {
      $location.path(targetScreen);
    };

    $http.get('database/bagoaz-export.json').success(function (data) {
      $rootScope.gaiak = data.gaiak;
      $rootScope.lexiko = data.lexiko;
      $rootScope.ariketak = data.ariketak;
    });

    $scope.colorButton = function (index){
      var cookie = [];
      if (JSON.parse(localStorage.getItem("cookie")) != null){
        cookie = JSON.parse(localStorage.getItem("cookie"));
      }
      if (cookie.indexOf(index) > -1){
        return "button button-block button-stable"
      }else{
        return "button button-block button-positive"
      }
    };
  }]);

