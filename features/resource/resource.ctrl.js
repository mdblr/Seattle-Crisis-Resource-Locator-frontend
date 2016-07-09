'use strict';

(function() {
  angular
    .module('scrl-app')
    .controller('ReSrcCtrl', ReSrcCtrl)

    ReSrcCtrl.$inject = ['uiGmapGoogleMapApi', 'ReSrc', 'Markers'];

    function ReSrcCtrl(uiGmapGoogleMapApi, ReSrc, Markers) {

      const vm = this;
      const services = ReSrc.getServices();

      vm.views = {
        food: [],
        clothing: [],
        shelter: [],
        hygiene: [],
        health: services.health,
        human: services.human,
        tech: services.technology
      }

      vm.markers = Markers.organizations()

      ReSrc.orgMatrServ(services.material, vm.views);

      vm.map = {
        center: {
          latitude: services.loc_req.lat,
          longitude: services.loc_req.lng
        },
        zoom: 14,
        markers: vm.markers
      };
    }

})();
