'use strict';

function ngScrollBottom($timeout) {
  return {
    scope: {
      ngScrollBottom: '='
    },
    link: ($scope, $element) => {
      $scope.$watchCollection('ngScrollBottom', newValue => {
        if (newValue) {
          $timeout(() => {
            $element[0].scrollTop = $element[0].scrollHeight;
          }, 0);
        }
      });
    }
  };
}

module.exports = ngScrollBottom;
