const commands = require('./commands.config.js');

function msgService($http) {
  const services = this;
  var currentPromptIndex = 0;
  services.order;
  services.botResponses;
  services.userName;

  services.msgs = [
    {
      msg: 'Hey there! My name is Stella.',
      bot: true,
    },
    {
      msg: 'If you need any help, enter /help for a list of commands.',
      bot: true,
    }
];

  function addMessage(msg, botFlag) {
    services.msgs.push({
      msg: msg,
      bot: botFlag,
    })
  }

  services.submitMessage = function(msg) {
    addMessage(msg, false);
    if (msg === 'Start over.') {
      currentPromptIndex = 0;
      services.getNextBotMsg();
    } else if (commands[msg]) {
      services.retrieveData(services.userName, commands[msg]);
    } else {
      if (currentPromptIndex === 1) {
        services.userName = msg;
      }
      if (currentPromptIndex <= services.order.length) {
        const prevBotQuestion = services.order[currentPromptIndex - 1];
        services.postMsg(msg, prevBotQuestion);
        services.getNextBotMsg();
      }
    }
  };

  services.getNextBotMsg = function() {
    var response;
    if (currentPromptIndex < services.order.length) {
      nextResponse = services.order[currentPromptIndex++];
      response = services.botResponses[nextResponse];
    } else {
      response = 'Thanks! The onboarding is complete.';
    }
    addMessage(response, true);
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
    .catch(function(err) {
      console.log('Error', err);
    })
  }

  services.retrieveData = function(userName, key) {
    $http.get('/users', {
      params: {
        userName: userName
      }
    })
    .then(function(data) {
      addMessage(data.data[key], true);
      services.getNextBotMsg();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  services.getBotResponses = function() {
     $http.get('/bot/responses')
      .then(function(data) {
        services.order = data.data.order;
        services.botResponses = data.data.responses;
        services.getNextBotMsg();
      });
  }

  services.printHelp = function() {
    addMessage(commands.printHelp, true);
  }
}

angular.module('app').service('msgService', msgService);
