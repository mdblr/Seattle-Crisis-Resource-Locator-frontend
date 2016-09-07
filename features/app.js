'use strict';
// const dotenv = require('dotenv').load();

(function() {
    angular
      .module('scrl-app', ['ui.router','uiGmapgoogle-maps','ngAnimate','ngMaterial'])
      .config(config)
      .config(ngGoogleMaps)
      .run(run)

  config.$inject = ['$stateProvider'];

  function ngGoogleMaps(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key:'AIzaSyCBJa7t5PUpcnGTVgtoOqvWOBbwuPcPazA',
      v: '3.20',
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

  function run($window, $state) {
    $window.onbeforeunload = function () {
      $state.go('index');
    };
  }
  
})();
