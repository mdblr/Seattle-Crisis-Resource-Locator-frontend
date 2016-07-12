(function() {
  angular
    .module('scrl-app')
    .factory('Serv', Serv)

    function Serv() {

      const sliceAt = views => {
        for (view in views) {
          views[view].services.map(service => {
            if (service.description.length > 300) {
              views[view].sliceAt = 2;
            }
          })
        }
      }

      return {
        sliceAt
      }
    }
})();
