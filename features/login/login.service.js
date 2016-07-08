'use strict';

(function() {
  angular
    .module('scrl-app')
    .factory('Login', Login)

  Login.$injet = ['http'];

  function Login($http) {

    const locate = addr => {
      return $http({
                method: 'POST',
                url: 'http://sea-crisis-resource.herokuapp.com/api/nearby',
                data: { addr: addr }
              });
    }

    return { locate }
  }

})();
