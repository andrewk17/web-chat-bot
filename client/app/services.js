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
    if (currentPromptIndex === 1) {
      services.userName = msg;
    }
    addMessage(msg, false);
    if (currentPromptIndex < services.order.length) {
      const prevBotQuestion = services.order[currentPromptIndex - 1];
      services.postMsg(msg, prevBotQuestion);
      services.getNextBotMsg();
    } else {
      addMessage('Thanks! The onboarding is complete.', true);
    }
  };

  services.getNextBotMsg = function() {
    const nextResponse = services.order[currentPromptIndex++];
    addMessage(services.botResponses[nextResponse], true);
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

  services.getBotResponses = function() {
     return $http.get('/bot/responses');
  }

  services.printHelp = function() {
    const helpMessage =
    `List of available commands:
    Start over. - starts the onboarding process all over
    Show my name. - shows your name
    Show my work experience. - shows your experience
    Show my address. - shows your address
    Show my education. - shows your education
    Show my resume. - shows your resume
    Show my LinkedIn. - shows your LinkedIn`;
    addMessage(helpMessage, true);
  }
}

angular.module('app').service('msgService', msgService);
