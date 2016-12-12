'use strict';

const app = angular.module('ChatBot.chatBox', []);
app.controller('ChatBoxController', ['msgService', '$timeout', require('./chatBox.controller.js')])
  .directive('chatBox', require('./chatBox.directive.js'))
  .service('msgService', ['$http', '$log', require('./chatBox.service.js')]);

module.exports = app.name;
