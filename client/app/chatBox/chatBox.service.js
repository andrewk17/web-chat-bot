'use strict';

function msgService($http, $log) {
  const services = this,
    ONBOARDING_COMPLETE = 'Thanks! The onboarding is complete.';

  let currentPromptIndex = 0,
    order,
    botResponses,
    userName,
    commands,
    printHelp;

  // messages seeded with welcoming messages
  services.msgs = [
    {
      msg: 'Hey there! My name is Stella.',
      bot: true
    }, {
      msg: 'If you need any help, enter /help for a list of commands.',
      bot: true
    }
  ];

  services.submitMessage = function(msg) {
    // always add message from user to array of messages
    addMessage(msg, false);
    // check for start over command
    if (msg === 'Start over.') {
      // restarts bot questions
      currentPromptIndex = 0;
      getNextBotMsg();
    // check to see if user entered a command
    } else if (commands[msg]) {
      let key = commands[msg];
      // retrieves user data from DB
      retrieveData(userName)
        .then(data => {
          addMessage(data.data[key], true);
          getSameBotMsg();
        })
        .catch(err => {
          $log(err);
        });
    } else {
      // save username if the user is responding to first question
      if (currentPromptIndex === 1) {
        userName = msg;
      }
      // only fetch next robot question if there is another question
      if (currentPromptIndex <= order.length) {
        const prevBotQuestion = order[currentPromptIndex - 1]; // getting the just asked question
        postMsg(msg, prevBotQuestion)
          .catch(err => {
            $log('Error', err);
          });
        getNextBotMsg();
      }
    }
  };

  // Adds help message to array of messages
  services.printHelp = function() {
    addMessage(printHelp, true);
  };

  // adds message to array of messages
  // can be either bot or user message
  function addMessage(msg, botFlag) {
    services.msgs.push({msg: msg, bot: botFlag});
  }

  // gets the same bot msg as last timeout
  // useful for when user has not progressed with onboarding
  function getSameBotMsg() {
    let response;
    if (currentPromptIndex < order.length) {
      let mostRecentResponse = order[currentPromptIndex - 1];
      response = botResponses[mostRecentResponse];
    } else {
      response = ONBOARDING_COMPLETE;
    }
    addMessage(response, true);
  }

  // gets the next question for the bot to ask user
  function getNextBotMsg() {
    let response;
    if (currentPromptIndex < order.length) {
      let nextResponse = order[currentPromptIndex];
      response = botResponses[nextResponse];
    } else {
      response = ONBOARDING_COMPLETE;
    }
    currentPromptIndex++;
    addMessage(response, true);
  }

  // sends user data to backend
  function postMsg(msg, key) {
    const data = {
      name: userName,
      field: {
        key: key,
        value: msg
      }
    };

    return $http.post('/users', data);
  }

  // retrieves user data from backend
  function retrieveData(userName) {
    return $http.get('/users', {
      params: {
        userName: userName
      }
    });
  }

  // gets configuration from backend
  function getConfig() {
    return $http.get('/bot/questions');
  }

  // retrives bot questions from backend
  getConfig()
    .then(data => {
      order = data.data.order;
      botResponses = data.data.questions;
      commands = data.data.commands;
      printHelp = data.data.printHelp;
      getNextBotMsg();
    });
}

module.exports = msgService;
