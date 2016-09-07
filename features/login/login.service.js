'use strict';

(function() {
  angular
    .module('scrl-app')
    .factory('Login', Login)

  Login.$injet = ['http', 'ReSrc'];

  function Login($http, ReSrc) {

    const locate = addr => {
      ReSrc.saveAddr(addr);
      return $http({
                method: 'POST',
                url: 'https://sea-crisis-resource.herokuapp.com/api/nearby',
                data: { addr: addr }
              });
    }

    return { locate }
  }

})();
