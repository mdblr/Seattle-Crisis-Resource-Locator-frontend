'use strict';

(function() {
  angular
    .module('scrl-app')
    .directive('dirReSrc', dirReSrc)

  dirReSrc.$inject = ['ReSrc', '$interval'];

  function dirReSrc(ReSrc, $interval) {

    let directive = {
      restrict: 'E',
      controller: controller,
      scope: {
        title: '=',
        services: '='
      },
      controllerAs: 'vm',
      templateUrl: 'features/resource/services/services.html'
    };

    return directive;

    function controller() {
      let vm = this;
      const services = ReSrc.getServices();
      let views = {
        food: {
          title: 'Places to Eat',
          services: []
        },
        clothing: {
          title: 'Clothing',
          services: []
        },
        shelter: {
          title: 'Shelter',
          services: []
        },
        hygiene: {
          title: 'Hygiene',
          services: []
        },
        health: {
          title: 'Health',
          services: services.health
        },
        human: {
          title: 'Resource Centers',
          services: services.human
        },
        tech: {
          title: 'Internet',
          services: services.technology
        }
      }

      vm.view = views['food'];

      ReSrc.orgMatrServ(services.material, views);
      let count = 1;
      let cache = {};
      const keys = Object.keys(views);

      $interval(() => {
        if (count === 7)  count = 0 ;
        vm.view = views[keys[count]];
        count++;
      }, 20000);
    }
  }
})();
