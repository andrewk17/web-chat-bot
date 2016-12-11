function chatBox() {
  return {
    template: `
    <div class="messages">
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

angular.module('app').directive('chatBox', chatBox);
