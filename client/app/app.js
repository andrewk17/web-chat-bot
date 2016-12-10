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

    services.currentPrompt = 0;
    services.bot;

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
        addMessage(services.bot.responses[services.bot.order[services.currentPrompt]], true);
        if (services.currentPrompt++ === services.bot.order.length) {
          services.currentPrompt = 0;
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
           services.bot = data.data;
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
