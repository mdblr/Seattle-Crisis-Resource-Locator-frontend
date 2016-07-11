'use strict';

(function() {
  angular
    .module('scrl-app')
    .directive('dirReSrc', dirReSrc)

  dirReSrc.$inject = ['ReSrc', '$interval', 'uiGmapGoogleMapApi', '$timeout'];

  function dirReSrc(ReSrc, $interval, uiGmapGoogleMapApi, $timeout) {

    let directive = {
      restrict: 'E',
      templateUrl: 'features/resource/services/services.html'
    };

    return directive;

  }
})();
