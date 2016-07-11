// 'use strict';

(function() {
  angular
    .module('scrl-app')
    .controller('ReSrcCtrl', ReSrcCtrl)

    ReSrcCtrl.$inject = ['ReSrc', 'Markers', '$interval', 'uiGmapGoogleMapApi', '$timeout'];

    function ReSrcCtrl(ReSrc, Markers, $interval, uiGmapGoogleMapApi, $timeout) {

      const vm = this;
      const services = ReSrc.getServices();

      let markers = Markers.organizations()
      vm.map = {
        center: {
          latitude: services.loc_req.lat,
          longitude: services.loc_req.lng
        },
        options: {
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        },
        zoom: 14,
        markers: markers,
        window: {
          marker: {},
          show: false,
          templateURL: 'features/resource/map/marker.html',
          closeClick: () => {
            this.show = false;
          },
          options: {
            pixelOffset: {
              width: 0,
              height: -24
            }
          }
        },
        control: {},
        markerEvents: {
          trigger: function(marker, eventName, model, args) {
            vm.map.window.model = model;
            vm.map.window.show = true;
          }
        }
      };

      let views = {
        health: {
          title: 'Health',
          services: services.health
        },
        hygiene: {
          title: 'Hygiene',
          services: []
        },
        human: {
          title: 'Resource Centers',
          services: services.human
        },
        tech: {
          title: 'Internet',
          services: services.technology
        },
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
        }
      }

      ReSrc.orgMatrServ(services.material, views);

      for (view in views) {
        views[view].services.forEach(service => {
          markers.forEach(mark => {
            if (mark.name === service.name) {
              service.marker = mark;
            }
          })
        })
      }

      vm.view = views['health'];

      let count = 1;
      let keys = Object.keys(views);
      let viewed = {
        food:false,
        clothing:false,
        shelter:false,
        hygiene:false,
        health:false,
        human:false
      }

      uiGmapGoogleMapApi.then(function(maps) {
        $timeout(()=> {
          vm.map.markerEvents.trigger(vm.view.services[0].marker, 'click', vm.view.services[0].marker);
        },1000);
        let countB = 1;
        $interval(()=> {
          if (countB === vm.view.services.length) countB = 0;
          vm.map.markerEvents.trigger(vm.view.services[countB].marker, 'click', vm.view.services[countB].marker);
          countB++;
        }, 5333, 2);
      });

      $interval(() => {
        if (count === 7)  count = 0 ;

        if (views[keys[count]].services.length > 3 && keys[count] !== 'tech') {
          if (!viewed[keys[count]]) {
            vm.view = {
              title: views[keys[count]].title,
              services: views[keys[count]].services.slice(0, 3),
            }
            viewed[keys[count]] = true;
          }
          else {
            vm.view = {
              title: views[keys[count]].title,
              services: views[keys[count]].services.slice(3),
            }
            viewed[keys[count]] = false;
          }
        }
        else {
          vm.view = views[keys[count]];
        }

        count++;

        uiGmapGoogleMapApi.then(function(maps) {
          $timeout(()=> {
            vm.map.markerEvents.trigger(vm.view.services[0].marker, 'click', vm.view.services[0].marker);
          }, 150);
          let countB = 1;
          $interval(()=> {
            if (countB === vm.view.services.length) countB = 0;
            vm.map.markerEvents.trigger(vm.view.services[countB].marker, 'click', vm.view.services[countB].marker);
            countB++;
          }, 5333, 2);
        });
      }, 16000);
    }

})();
