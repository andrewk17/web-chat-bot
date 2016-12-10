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

    msgService.getBotResponses()
      .then(function(data) {
        msgService.order = data.data.order;
        msgService.botResponses = data.data.responses;
        msgService.getNextBotMsg();
      })
  }])
  .service('msgService', function($http) {
    const services = this;

    var currentPromptIndex = 0;
    services.order;
    services.botResponses;
    services.userName;

    services.msgs = [{
      msg: 'Hey there! My name is Stella.',
      bot: true
    }];

    function addMessage(msg, botFlag) {
      services.msgs.push({
        msg: msg,
        bot: botFlag,
      })
    }

    services.submitMessage = function(msg) {
      if (currentPromptIndex === 1) {
        services.userName = msg;
      }
      addMessage(msg, false);
      const prevBotQuestion = services.order[currentPromptIndex - 1];
      services.postMsg(msg, prevBotQuestion);
      services.getNextBotMsg();
    };

    services.getNextBotMsg = function() {
      const nextResponse = services.order[currentPromptIndex++];
      addMessage(services.botResponses[nextResponse], true);
      // if (currentPromptIndex++ === services.order.length) {
      //   currentPromptIndex = 0;
      // }
    }

    services.postMsg = function(msg, key) {
      const data = {
        name: services.userName,
        field: {
          key: key,
          value: msg,
        },
      };

      $http.post('/users', data)
        .then(function(res) {
          console.log('success with post')
        });
    }

    services.getBotResponses = function() {
       return $http.get('/bot/responses');
    }
  })
  .directive('chatBox', function() {
    return {
      template: `
      <div class="messages">
        <div ng-class="{'bot-div': !msg.bot}" ng-repeat="msg in chatBox.msgs track by $index">
        <span ng-class="msg.bot ? 'bot' : 'user'">{{msg.msg}}</span>
        </div>
      </div>
      <form class='msg-form' ng-submit="chatBox.recordResponse()" >
        <input class="user-input" ng-model="chatBox.msg" type="text" placeholder="Type your message here">
        <input class="user-input-submit" type="submit" value="Send">
      </form>
      `,
    }
  })
