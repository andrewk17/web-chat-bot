// include CSS in webpack bundle
require('./main.css');

angular.module('app', []);

// require statements need to be after angular module is initialized
require('./directives.js');
require('./controllers.js');
require('./services.js');
