'use strict';
const dotenv = require('dotenv').load();


(function() {
    angular
      .module('scrl-app', ['ui.router','uiGmapgoogle-maps',require('angular-animate')])
      .config(config)
      .config(ngGoogleMaps)

  config.$inject = ['$stateProvider'];

  function ngGoogleMaps(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: process.env.googKey,
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
})();
