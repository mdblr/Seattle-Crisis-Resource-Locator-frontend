'use strict';

(function() {
  angular
    .module('scrl-app')
    .factory('ReSrc', ReSrc)

    function ReSrc()  {

      let resources, tech, hlth, mtrl, shltr, hmn;

      const store = results => {
        resources = results;
      }

      const get = () => {
        return resources;
      }

      // const parse = (data) => {
      //
      // }

      return { store, get }
    }


})();
