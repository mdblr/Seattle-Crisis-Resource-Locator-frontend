'use strict';

(function() {
  angular
    .module('scrl-app')
    .factory('ReSrc', ReSrc)

  function ReSrc(Serv) {

    let resources;
    let services;

    const storeResourceRes = results => {
      resources = results;
    }

    const storeServices = parsed_data => {
      services = parsed_data;
    }

    const getResourceRes = () => {
      return resources;
    }

    const getServices = () => {
      return services;
    }

    const parseServices = data => {

      let services = {
        loc_req: data.req,
        technology: [],
        health: [],
        material: [],
        shelter: [],
        human: []
      };

      for (let i = 0; i < data.res.length; i++) {
        data.res[i].map(org => {
          org.services.forEach(service => {
            ['technology', 'health', 'material', 'human']
            .forEach(ctgry => {
              if (service[ctgry] === true) {
                ['id', 'name', 'phone_1', 'phone_2', 'address', 'loc_id']
                .forEach(item => {
                  service[item] = org[item];
                });
                services[ctgry].push(service);
              }
            })
          })
        })
      }


      return services;
    }

    const orgMatrServ = (materialServices, newHolder) => {
      materialServices.forEach(service => {
        newHolder[service.subcategory.toLowerCase()].services.push(service);
      })

      Serv.sliceAt(newHolder); 
    }

    return {
      storeResourceRes,
      storeServices,
      getResourceRes,
      getServices,
      parseServices,
      orgMatrServ
    }
  }


})();
