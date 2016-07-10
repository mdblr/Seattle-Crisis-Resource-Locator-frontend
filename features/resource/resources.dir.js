(function() {
  angular
    .module('scrl-app')
    .directive('dirReSrc', dirReSrc)

    dirReSrc.$inject = ['$interval', '$animate'];

    function dirReSrc($interval, $animate) {

      const directive = {
        restrict: 'E',
        scope: {
          object: '='
        },
        templateUrl: 'features/resource/resources.html',
        link: link
      };

      return directive;

      function link() {

        let count = 0;
        let section;
        let current;

        $interval(()=> {

          if (current) $animate.addClass(current, 'hide');

          const id = ['food', 'clothing', 'shelter', 'hygiene', 'health', 'human', 'tech'];

          let hasClass = angular.element(document.getElementById(id[count])).hasClass('hide');
          section = angular.element(document.getElementById(id[count]));

          count++;

          if (count === 7) count = 0;

          if (hasClass === false) {
            $animate.addClass(section, 'hide');
          }
          else if (count > 0 || current) {
            $animate.removeClass(section, 'hide');
            current = section;
          }

        }, 5000);
      }
    }
})();
