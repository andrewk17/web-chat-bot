angular
  .module('app', [
  ])
  .controller('ChatBoxController', ['$http', function($http) {
    const chat = this;

    chat.submitMsg = function() {
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
        <ul>
          <li>Welcome to Chat Bot!</li>
        </ul>
        <form ng-submit="chatBox.submitMsg()" >
          <input type="text">
        </form>
      </div>
      `
    }
  })
