angular
  .module('app', [
  ])
  .controller('ChatBoxController', ['$http', function($http) {
    const chat = this;
    chat.msgs = ['Welcome to Chat Bot!'];

    chat.submitMsg = function() {
      chat.msgs.push(chat.msg);
      $http.post('/users', {})
        .then(function(data) {
          console.log('success with post')
        });
    }
  }])
  .directive('chatBox', function() {
    return {
      template: `
      <div>
        <div ng-repeat="msg in chatBox.msgs">
        {{msg}}
        </div>
        <form ng-submit="chatBox.submitMsg()" >
          <input ng-model="chatBox.msg" type="text">
        </form>
      </div>
      `
    }
  })
