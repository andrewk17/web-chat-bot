'use strict';

function ngScrollBottom($timeout) {
  return {
    scope: {
      ngScrollBottom: '='
    },
    link: function($scope, $element) {
      $scope.$watchCollection('ngScrollBottom', function(newValue) {
        if (newValue) {
          $timeout(function() {
            $element[0].scrollTop = $element[0].scrollHeight;
          }, 0);
        }
      });
    }
  };
}

module.exports = ngScrollBottom;
