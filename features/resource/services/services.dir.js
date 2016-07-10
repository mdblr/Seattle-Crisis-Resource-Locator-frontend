'use strict';

(function() {
  angular
    .module('scrl-app')
    .directive('dirServices', dirServices);

    function dirServices() {

      const directive = {
        restrict: 'E',
        scope: {
          title: '=',
          type: '='
        },
        templateUrl: "features/resource/services/services.html"
      }

      return directive;
    }

})();
