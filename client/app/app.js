angular
  .module('app', [
  ])
  .controller('ChatBoxController', ['services', function(services) {
    const chat = this;

    chat.msgs = [{
      msg: 'Welcome to Chat Bot!',
      bot: true
    }];

    function addMessage(msg, botFlag) {
      chat.msgs.push({
        msg: msg,
        bot: botFlag,
      })
    }

    chat.recordResponse = function() {
      addMessage(chat.msg, false);
      chat.msg = '';
      services.postMsg();
      addMessage(services.bot.responses[services.bot.order[services.currentPrompt]], true);
      if (services.currentPrompt++ === services.bot.order.length) {
        services.currentPrompt = 0
      }
    }
  }])
  .service('services', function($http) {
    const services = this;

    services.currentPrompt = 0;
    services.bot;

    services.postMsg = function() {
      $http.post('/users', {})
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
      <div class="messages">
        <div ng-class="{bot: msg.bot}" ng-repeat="msg in chatBox.msgs track by $index">
        {{msg.msg}}
        </div>
      </div>
      <form ng-submit="chatBox.recordResponse()" >
        <input class="user-input" ng-model="chatBox.msg" type="text">
      </form>
      `
    }
  })
