(function() {
  angular
    .module('scrl-app')
    .directive('dirMap', dirMap);

    function dirMap() {

      var directive = {
        templateUrl: 'features/resource/map/maps.html',
        restrict: 'E'
      }

      return directive;
    }

})();
