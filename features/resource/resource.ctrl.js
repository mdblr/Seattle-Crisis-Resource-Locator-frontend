// 'use strict';

(function() {
  angular
    .module('scrl-app')
    .controller('ReSrcCtrl', ReSrcCtrl)

  ReSrcCtrl.$inject = ['ReSrc', 'Markers', 'uiGmapGoogleMapApi', '$interval', '$timeout'];

  function ReSrcCtrl(ReSrc, Markers, uiGmapGoogleMapApi, $interval, $timeout) {

    const vm = this;
    const services = ReSrc.getServices();

    let markers = Markers.organizations()

    vm.address = ReSrc.getAddr();
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
          let cards = angular.element(document).find('md-card');
          let current;
          // if (!current === document.getElementById(model.id)) {
          //   if (current) angular.element(current).removeClass('current');
          //   current = getElementById(model.id);
          //   angular.element(current).addClass('current');
          // }
          //
          for (let i = 1; i < cards.length; i++) {
            if (cards.eq(i).hasClass('current')) {
              cards.eq(i).removeClass('current');
            }
          }
          let card = document.getElementById(model.id);
          angular.element(card).addClass('current');
        },
        click: function(marker, eventName, model, args) {
          vm.map.window.model = model;
          vm.map.window.show = true;
        }
      }
    };

    uiGmapGoogleMapApi.then(function(maps) {
      $timeout(() => {
        vm.map.options.mapTypeId = google.maps.MapTypeId.SATELLITE;
      }, 150)
    });

    let views = {
      health: {
        title: 'Health',
        services: services.health,
        sliceAt: 3
      },
      hygiene: {
        title: 'Hygiene',
        services: [],
        sliceAt: 3
      },
      human: {
        title: 'Resource Centers',
        services: services.human,
        sliceAt: 3
      },
      tech: {
        title: 'Internet',
        services: services.technology,
        sliceAt: 3
      },
      food: {
        title: 'Places to Eat',
        services: [],
        sliceAt: 3
      },
      clothing: {
        title: 'Clothing',
        services: [],
        sliceAt: 3
      },
      shelter: {
        title: 'Shelter',
        services: [],
        sliceAt: 3
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

    let count = 1;
    let keys = Object.keys(views);
    let viewed = {
      food: false,
      clothing: false,
      shelter: false,
      hygiene: false,
      health: false,
      human: false
    }

    vm.view = {
      title: views.health.title,
      services: views.health.services.slice(0, views.health.sliceAt)
    }
    viewed.health = true;

    uiGmapGoogleMapApi.then(function(maps) {
      $timeout(() => {
        vm.map.markerEvents.trigger(vm.view.services[0].marker, 'click', vm.view.services[0].marker);
      }, 2000);
      let countB = 1;
      $interval(() => {
        if (countB === vm.view.services.length) countB = 0;
        vm.map.markerEvents.trigger(vm.view.services[countB].marker, 'click', vm.view.services[countB].marker);
        countB++;
      }, 8000, 2);
    });

    $interval(() => {
      if (count === 7) count = 0;

      if (views[keys[count]].services.length > 3) {
        if (!viewed[keys[count]]) {
          vm.view = {
            title: views[keys[count]].title,
            services: views[keys[count]].services.slice(0, views[keys[count]].sliceAt),
          }
          viewed[keys[count]] = true;
        } else {
          vm.view = {
            title: views[keys[count]].title,
            services: views[keys[count]].services.slice(views[keys[count]].sliceAt, views[keys[count]].sliceAt),
          }
          viewed[keys[count]] = false;
        }
      } else {
        vm.view = views[keys[count]];
      }

      count++;

      uiGmapGoogleMapApi.then(function(maps) {
        $timeout(() => {
          if (vm.view.services[0]) {
            vm.map.markerEvents.trigger(vm.view.services[0].marker, 'click', vm.view.services[0].marker);
          }
        }, 150);
        let countC;
        vm.view.services.length === 1 ? countC = 0 : countC = 1;
        $interval(() => {
          if (vm.view.services[countC]) {
            vm.map.markerEvents.trigger(vm.view.services[countC].marker, 'click', vm.view.services[countC].marker);
          }
          countC++;
        }, (32000/vm.view.services.length), vm.view.services.length);

      });
    }, 32000);
  }

})();
