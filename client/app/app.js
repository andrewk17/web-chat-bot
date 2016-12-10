angular
  .module('app', [
  ])
  .controller('ChatBoxController', ['services', function(services) {
    const chat = this;
    chat.msgs = ['Welcome to Chat Bot!'];

    chat.submitMsg = function() {
      chat.msgs.push(chat.msg);
      services.postMsg();
    }
  }])
  .service('services', function($http) {
    const services = this;
    services.postMsg = function() {
      $http.post('/users', {})
        .then(function(data) {
          console.log('success with post')
        });
    }
  })
  .directive('chatBox', function() {
    return {
      template: `
      <div class="messages">
        <div ng-repeat="msg in chatBox.msgs track by $index">
        {{msg}}
        </div>
      </div>
      <form ng-submit="chatBox.submitMsg()" >
        <input class="user-input" ng-model="chatBox.msg" type="text">
      </form>
      `
    }
  })
