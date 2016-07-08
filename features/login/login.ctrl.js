'use strict';

(function() {
  angular
    .module('scrl-app')
    .controller('LoginCtrl', LoginCtrl)

    LoginCtrl.$inject = ['$state', 'Login', 'ReSrc'];

    function LoginCtrl($state, Login, ReSrc) {
      let vm = this;
      vm.submit = function(addr) {
        Login.locate(addr)
        .then( function successCallback(res) {
          let services = ReSrc.parse(res.data);
          ReSrc.store(services);
          $state.go('resource');
        }, function errorCallback(err) {
          vm.results = err;
        });
      }
    }

})();
