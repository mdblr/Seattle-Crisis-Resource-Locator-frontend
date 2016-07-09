(function() {
  angular
    .module('scrl-app')
    .factory('Markers', Markers);

    Markers.$inject = ['ReSrc'];

    function Markers(ReSrc) {

      let models = []

      const organizations = () => {

        const data = ReSrc.getResourceRes();

        data.res.map(location => {
          location.map(org => {

            let model = {
              id: org.id,
              name: org.name,
              coords: {
                latitude: org.geog.lat,
                longitude: org.geog.lng
              }
            }
            models.push(model);
          })
        })
        return models;
      }

      return {
        organizations
      }
    }
})();
