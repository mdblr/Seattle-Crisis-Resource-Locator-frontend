// 'use strict';

(function() {
  angular
    .module('scrl-app')
    .controller('ReSrcCtrl', ReSrcCtrl)

    ReSrcCtrl.$inject = ['ReSrc', 'Markers', '$interval'];

    function ReSrcCtrl(ReSrc, Markers, $interval) {

      const vm = this;
      const services = ReSrc.getServices();

      vm.markers = Markers.organizations()
      vm.map = {
        center: {
          latitude: services.loc_req.lat,
          longitude: services.loc_req.lng
        },
        zoom: 14,
        markers: vm.markers,
        window: {
          marker: {},
          show: false,
          templateURL: 'features/resource/map/marker.html',
          closeClick: () => {
            this.show = false;
          },
          options: {}
        },
        markerEvents: {
          click: function(marker, eventName, model, args){
            vm.map.window.model = model;
            vm.map.window.show = true;
          }
        }
      };

    }

})();
