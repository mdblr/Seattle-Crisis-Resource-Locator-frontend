'use strict';

(function() {
    angular
      .module('scrl-app', ['ui.router','uiGmapgoogle-maps','ngAnimate','ngMaterial'])
      .config(config)
      .config(ngGoogleMaps)
      .run(run)

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function ngGoogleMaps(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key:'AIzaSyCBJa7t5PUpcnGTVgtoOqvWOBbwuPcPazA',
      v: '3.20',
      libraries: 'weather,geometry,visualization'
    });
  }

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        views: {
          'login': {
            templateUrl: 'features/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'ctrl'
          }
        }
      })
      .state('resource', {
        url: '/resource',
        views: {
          'resource': {
            templateUrl: 'features/resource/resource.html',
            controller: 'ReSrcCtrl',
            controllerAs: 'ctrl'
          }
        }
      });

      $urlRouterProvider.otherwise('/');
  }

  function run($window, $state) {
    $window.onbeforeunload = function () {
      $state.go('index');
    };
  }

})();
