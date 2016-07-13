(function() {
  angular
    .module('scrl-app')
    .factory('Serv', Serv)

    function Serv() {

      const sliceAt = views => {
        for (view in views) {
          views[view].services.map(service => {
            if (service.description.length > 250) {
              views[view].sliceAt = 2;
            }
            else if (service.hours) {
              if (service.hours.length > 200) views[view].sliceAt = 2;
            }
          })
        }
      }

      return {
        sliceAt
      }
    }
})();
