'use strict';

(function() {
  angular
    .module('scrl-app')
    .controller('ReSrcCtrl', ReSrcCtrl)

    ReSrcCtrl.$inject = ['uiGmapGoogleMapApi', 'ReSrc'];

    function ReSrcCtrl(uiGmapGoogleMapApi, ReSrc) {

      const vm = this;
      vm.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 8
      };

      vm.resources = ReSrc.get();

    }

})();
