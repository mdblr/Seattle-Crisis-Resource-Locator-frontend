'use strict';

(function() {
    angular
      .module('scrl-app', ['ui.router','uiGmapgoogle-maps', 'ngAnimate','ngMaterial'])
      .config(config)
      .config(ngGoogleMaps)
      .run(run)

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  ngGoogleMaps.$inject = ['uiGmapGoogleMapApiProvider', 'googKey'];
  run.$inject = ['$window', '$state'];

  function ngGoogleMaps(uiGmapGoogleMapApiProvider, googKey) {
    uiGmapGoogleMapApiProvider.configure({
      key:googKey,
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
    $window.onbeforeunload = () => {
      $state.go('index');
    };
  }

})();
