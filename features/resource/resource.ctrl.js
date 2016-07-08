'use strict';

(function() {
  angular
    .module('scrl-app')
    .controller('ReSrcCtrl', ReSrcCtrl)

    ReSrcCtrl.$inject = ['uiGmapGoogleMapApi', 'ReSrc'];

    function ReSrcCtrl(uiGmapGoogleMapApi, ReSrc) {

      const vm = this;
      const services = ReSrc.get();

      vm.views = {
        food: [],
        clothing: [],
        shelter: [],
        hygiene: [],
        health: [services.health],
        human: [services.human],
        tech: [services.technology]
      }

      ReSrc.orgMatrServ(services.material, vm.views);

      vm.map = {
        center: {
          latitude: services.loc_req.lat,
          longitude: services.loc_req.lng
        },
        zoom: 16
      };
    }

})();
