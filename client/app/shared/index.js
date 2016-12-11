'use strict';

const app = angular.module('ChatBot.shared', []);
app.directive('ngScrollBottom', ['$timeout', require('./ngScrollBottomDirective.js')]);

module.exports = app.name;
