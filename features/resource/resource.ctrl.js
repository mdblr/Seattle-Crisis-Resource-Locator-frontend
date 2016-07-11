// 'use strict';

(function() {
  angular
    .module('scrl-app')
    .controller('ReSrcCtrl', ReSrcCtrl)

    ReSrcCtrl.$inject = ['ReSrc', 'Markers', '$interval', '$timeout', 'uiGmapGoogleMapApi'];

    function ReSrcCtrl(ReSrc, Markers, $interval, $timeout, uiGmapGoogleMapApi) {

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
          options: {}
        },
        control: {},
        markerEvents: {
          trigger: function(marker, eventName, model, args) {
            vm.map.window.model = model;
            vm.map.window.show = true;
          }
        }
      };

      // const services = ReSrc.getServices();
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

      vm.view = views['food'];

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
        vm.map.markerEvents.trigger(vm.view.services[0].marker, 'click', vm.view.services[0].marker);
        let countB = 1;
        $interval(()=> {
          if (countB === vm.view.services.length) countB = 0;
          vm.map.markerEvents.trigger(vm.view.services[countB].marker, 'click', vm.view.services[countB].marker);
          countB++;
        }, 5000, 4);
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
          vm.map.markerEvents.trigger(vm.view.services[0].marker, 'click', vm.view.services[0].marker);
          let countB = 1;
          $interval(()=> {
            if (countB === vm.view.services.length) countB = 0;
            vm.map.markerEvents.trigger(vm.view.services[countB].marker, 'click', vm.view.services[countB].marker);
            countB++;
          }, 5000, 4);
        });
      }, 20000);
    }

})();
