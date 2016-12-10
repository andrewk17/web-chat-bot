angular
  .module('app', [
  ])
  .controller('ChatBoxController', ['msgService', '$timeout', function(msgService, $timeout) {
    const chat = this;

    chat.msgs = msgService.msgs;

    chat.recordResponse = function() {
      msgService.submitMessage(chat.msg, false);
      chat.msg = '';

      $timeout(function() {
        var scroller = document.getElementsByClassName("messages")[0];
        scroller.scrollTop = scroller.scrollHeight;
      }, 0, false);
    }
  }])
  .service('msgService', function($http) {
    const services = this;

    let currentPromptIndex = 0,
      order = null,
      botResponses = null;

    services.msgs = [{
      msg: 'Welcome to Chat Bot!',
      bot: true
    }];

    function addMessage(msg, botFlag) {
      services.msgs.push({
        msg: msg,
        bot: botFlag,
      })
    }

    services.submitMessage = function(msg) {
      addMessage(msg, false);
      services.postMsg(msg);
      const nextResponse = order[currentPromptIndex];
      addMessage(botResponses[nextResponse], true);
      if (currentPromptIndex++ === order.length) {
        currentPromptIndex = 0;
      }
    };

    services.postMsg = function(msg) {
      $http.post('/users', {
        name: 'Andrew',
        address: msg,
      })
        .then(function(data) {
          console.log('success with post')
        });
    }

    services.getBotResponses = function() {
       $http.get('/bot/responses')
         .then(function(data) {
           order = data.data.order;
           botResponses = data.data.responses;
         });
    }

    services.getBotResponses();
  })
  .directive('chatBox', function() {
    return {
      template: `
      <div class="messages" schroll-bottom="messages">
        <div ng-class="{'bot-div': !msg.bot}" ng-repeat="msg in chatBox.msgs track by $index">
        <span ng-class="msg.bot ? 'bot' : 'user'">{{msg.msg}}</span>
        </div>
      </div>
      <form class='msg-form' ng-submit="chatBox.recordResponse()" >
        <input class="user-input" ng-model="chatBox.msg" type="text">
      </form>
      `,
    }
  })
