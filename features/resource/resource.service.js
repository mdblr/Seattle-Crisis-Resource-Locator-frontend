'use strict';

(function() {
  angular
    .module('scrl-app')
    .factory('ReSrc', ReSrc)

  function ReSrc() {

    let resources;

    const store = results => {
      resources = results;
    }

    const get = () => {
      return resources;
    }

    const parse = data => {

      let parsed_data = {
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
                parsed_data[ctgry].push(service);
              }
            })
          })
        })
      }
      return parsed_data;
    }

    const orgMatrServ = (materialServices, newHolder) => {
      materialServices.forEach(service => {
        newHolder[service.subcategory.toLowerCase()].push(service);
      })
    }

    return {
      store,
      get,
      parse,
      orgMatrServ
    }
  }


})();
