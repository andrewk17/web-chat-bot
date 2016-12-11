// include CSS in webpack bundle
require('./main.css');

angular.module('app', [
  require('./shared/index.js'),
  require('./chatBox/index.js'),
]);
