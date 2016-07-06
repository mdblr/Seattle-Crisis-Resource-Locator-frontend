'use strict';

( () => {

  angular
    .module('scrl-app', ['ui.router'])
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

      $stateProvider
        .state('index', {
          url: "",
          views: {
            "config" : { template: "config<br><a ui-sref='dash'>dash</a>" }
          }
        })
        .state('dash', {
          url: "/dash",
          views: {
            "dash" : { template: "dash<br><a ui-sref='index'>index</a>" }
          }
        });
    }
})();
