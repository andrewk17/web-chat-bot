function chatBox() {
  return {
    template: `
    <div class="messages" ng-scroll-bottom="chatBox.msgs">
      <div ng-class="{'bot-div': !msg.bot}" ng-repeat="msg in chatBox.msgs track by $index">
      <span ng-class="msg.bot ? 'bot' : 'user'"><pre>{{msg.msg}}</pre></span>
      </div>
    </div>
    <form class='msg-form' ng-submit="chatBox.recordResponse()" >
      <input class="user-input" ng-model="chatBox.msg" type="text" placeholder="Type your message here">
      <input class="user-input-submit" type="submit" value="Send">
    </form>
    `,
  }
}

function ngScrollBottom($timeout) {
  return {
    scope: {
      ngScrollBottom: "="
    },
    link: function ($scope, $element) {
      $scope.$watchCollection('ngScrollBottom', function (newValue) {
        if (newValue) {
          $timeout(function(){
            $element[0].scrollTop = $element[0].scrollHeight
          }, 0);
        }
      });
    }
  }
}

angular.module('app')
  .directive('chatBox', chatBox)
  .directive('ngScrollBottom', ['$timeout', ngScrollBottom]);
