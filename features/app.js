'use strict';

(function() {
    angular
      .module('scrl-app', ['ui.router', 'uiGmapgoogle-maps'])
      .config(config)
      .config(ngGoogleMaps)

  config.$inject = ['$stateProvider'];

  function ngGoogleMaps(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCBJa7t5PUpcnGTVgtoOqvWOBbwuPcPazA',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  }

  function config($stateProvider) {
    $stateProvider
      .state('index', {
        url: '',
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
      })
  }
})();
