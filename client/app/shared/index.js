'use strict';

const app = angular.module('ChatBot.shared', []);
app.directive('ngScrollBottom', ['$timeout', require('./ngScrollBottom.directive.js')]);

module.exports = app.name;
